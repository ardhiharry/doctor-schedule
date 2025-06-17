import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';
import { AppDataSource } from '@config/database';

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
