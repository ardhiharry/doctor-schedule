import { CreateDoctorDto } from '@dtos/create-doctor.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDoctorDto implements Partial<CreateDoctorDto> {
  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Name must be at most 100 characters long',
  })
  name?: string;
}
