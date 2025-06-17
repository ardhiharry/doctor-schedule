import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'Name must be at most 100 characters long',
  })
  name: string;
}
