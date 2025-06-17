import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { DayOfWeek } from '@enums/day-of-week';

export class CreateScheduleDto {
  @IsInt()
  @IsNotEmpty()
  doctor_id: number;

  @IsEnum(DayOfWeek)
  @IsNotEmpty()
  day: DayOfWeek;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'time_start must be in HH:MM format',
  })
  time_start: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'time_finish must be in HH:MM format',
  })
  time_finish: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quota: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean = true;

  @IsDateString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD - YYYY-MM-DD format',
  })
  date: string;
}
