import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';
import { AppDataSource } from '@config/database';
import { RegisterUserDto } from '@dtos/register-user.dto';
import { compare, encrypt } from '@utils/encrypt';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { HttpException } from '@utils/http-exception';
import { LoginUserDto } from '@dtos/login-user.dto';
import { generateToken } from '@utils/jwt';
import { IReqUser } from '@middlewares/auth.middleware';

export class AuthService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    registerUserDto = plainToInstance(RegisterUserDto, registerUserDto);

    await validateOrReject(registerUserDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const { username, email, password } = registerUserDto;

    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (user) {
      throw new HttpException(400, 'User already exists');
    }

    registerUserDto.password = await encrypt(password);

    const newUser = this.userRepository.create(registerUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    loginUserDto = plainToInstance(LoginUserDto, loginUserDto);

    await validateOrReject(loginUserDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const { identifier, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      throw new HttpException(400, 'Username or email or password is invalid');
    }

    const isPasswordMatch: boolean = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new HttpException(400, 'Username or email or password is invalid');
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    user.token = token;

    return await this.userRepository.save(user);
  }

  async logout() {}

  async me(req: IReqUser) {
    const user = req.user;
    const result = await this.userRepository.findOneBy({ id: user?.id });

    if (!result) {
      throw new HttpException(400, 'Failed to get user');
    }

    return result;
  }
}
