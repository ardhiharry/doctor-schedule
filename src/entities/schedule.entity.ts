import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from '@entities/doctor.entity';
import { DayOfWeek } from '@enums/day-of-week';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  doctor_id: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: DayOfWeek,
  })
  day: DayOfWeek;

  @Column({
    nullable: false,
    type: 'time',
  })
  time_start: string;

  @Column({
    nullable: false,
    type: 'time',
  })
  time_finish: string;

  @Column({
    nullable: false,
    type: 'int',
    default: 0,
  })
  quota: number;

  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
  })
  status: boolean;

  @Column({
    nullable: false,
    type: 'date',
  })
  date: Date;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => Doctor, (doctor) => doctor.schedules)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;
}
