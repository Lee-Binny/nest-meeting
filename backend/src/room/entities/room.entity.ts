import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 45 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Schedule, (schedule) => schedule.roomId)
  schedule: Schedule[];
}
