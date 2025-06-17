import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '@enums/role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  first_name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
  })
  last_name: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  username: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Role,
    default: 'USER',
  })
  role: Role;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  token: string;

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

  @DeleteDateColumn({
    nullable: true,
    type: 'timestamp',
    default: null,
  })
  deleted_at: Date | null;
}
