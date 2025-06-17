import { Repository } from 'typeorm';
import { Schedule } from '@entities/schedule.entity';
import { Doctor } from '@entities/doctor.entity';
import { AppDataSource } from '@config/database';
import { DayOfWeek } from '@enums/day-of-week';
import { CreateScheduleDto } from '@dtos/create-schedule.dto';
import { HttpException } from '@utils/http-exception';

export class ScheduleService {
  private readonly scheduleRepository: Repository<Schedule>;
  private readonly doctorRepository: Repository<Doctor>;

  constructor() {
    this.scheduleRepository = AppDataSource.getRepository(Schedule);
    this.doctorRepository = AppDataSource.getRepository(Doctor);
  }

  private getDayName(date: Date): DayOfWeek {
    const days = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];
    return days[date.getDay()] as DayOfWeek;
  }

  private parseDateRange(dateRange: string): {
    startDate: Date;
    endDate: Date;
  } {
    const [start, end] = dateRange.split(' - ').map((date) => date.trim());
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new HttpException(
        400,
        'Invalid date format. Use YYYY-MM-DD - YYYY-MM-DD',
      );
    }

    if (startDate > endDate) {
      throw new HttpException(400, 'Start date must be before end date');
    }

    return { startDate, endDate };
  }

  private getDatesForDay(
    startDate: Date,
    endDate: Date,
    targetDay: DayOfWeek,
  ): Date[] {
    const dates: Date[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      if (this.getDayName(current) === targetDay) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule[]> {
    const { doctor_id, day, time_start, time_finish, quota, status, date } =
      createScheduleDto;

    const doctor = await this.doctorRepository.findOneBy({
      id: doctor_id,
    });

    if (!doctor) {
      throw new HttpException(404, 'Doctor not found');
    }

    if (time_start >= time_finish) {
      throw new HttpException(400, 'Start time must be before finish time');
    }

    const { startDate, endDate } = this.parseDateRange(date);

    const targetDates = this.getDatesForDay(startDate, endDate, day);

    if (targetDates.length === 0) {
      throw new HttpException(
        400,
        `No ${day} found in the specified date range`,
      );
    }

    const existingSchedules = await this.scheduleRepository.find({
      where: {
        doctor_id,
        day,
        time_start,
        time_finish,
      },
    });

    const existingDates = existingSchedules?.map((schedule) =>
      schedule.date.toDateString(),
    );

    const newDates = targetDates?.filter(
      (date) => !existingDates?.includes(date.toDateString()),
    );

    if (newDates.length === 0) {
      throw new HttpException(
        400,
        `All schedules for this day and time already exist`,
      );
    }

    const schedules: Schedule[] = [];

    for (const date of newDates) {
      const schedule = this.scheduleRepository.create({
        doctor_id,
        day,
        time_start,
        time_finish,
        quota,
        status,
        date,
      });

      schedules.push(schedule);
    }

    return await this.scheduleRepository.save(schedules);
  }

  async getAll(): Promise<any[]> {
    const schedules = await this.scheduleRepository.find({
      relations: ['doctor'],
    });

    return schedules.map((schedule) => {
      const { doctor, ...rest } = schedule;

      return {
        ...rest,
        doctor_name: doctor.name,
      };
    });
  }
}
