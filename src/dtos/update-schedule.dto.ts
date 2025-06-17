import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { DayOfWeek } from '@enums/day-of-week';
import { CreateScheduleDto } from '@dtos/create-schedule.dto';

export class UpdateScheduleDto implements Partial<CreateScheduleDto> {
  @IsInt()
  @IsOptional()
  doctor_id?: number;

  @IsEnum(DayOfWeek)
  @IsOptional()
  day?: DayOfWeek;

  @IsString()
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'time_start must be in HH:MM format',
  })
  time_start?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'time_finish must be in HH:MM format',
  })
  time_finish?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  quota?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
