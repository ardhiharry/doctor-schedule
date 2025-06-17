import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { OneOf } from '@decorators/one-of.decorator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'First name must be at least 3 characters long',
  })
  @MaxLength(50, {
    message: 'First name must be at most 50 characters long',
  })
  first_name: string;

  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Last name must be at least 3 characters long',
  })
  @MaxLength(50, {
    message: 'Last name must be at most 50 characters long',
  })
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Username must be at least 3 characters long',
  })
  @MaxLength(50, {
    message: 'Username must be at most 50 characters long',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50, {
    message: 'Email must be at most 50 characters long',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @MaxLength(50, {
    message: 'Password must be at most 50 characters long',
  })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @OneOf('password', {
    message: 'Passwords do not match',
  })
  @MinLength(6, {
    message: 'Confirm password must be at least 6 characters long',
  })
  @MaxLength(50, {
    message: 'Confirm password must be at most 50 characters long',
  })
  confirm_password: string;
}
