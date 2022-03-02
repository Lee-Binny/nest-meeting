import {
  Column,
  CreateDateColumn,
  Entity, Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';

@Entity()
@Index(['scheduleId', 'attendeeId'], {unique: true})
export class Attendee {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @ManyToOne((type) => Schedule, (schedule) => schedule.attendee)
  scheduleId: Schedule;

  @Column({type: 'bigint'})
  attendeeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
