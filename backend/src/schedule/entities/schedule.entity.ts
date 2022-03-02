import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Room } from '../../room/entities/room.entity';
import { Attendee } from '../../attendee/entities/attendee.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 45 })
  title: string;

  @ManyToOne((type) => User, (user) => user.schedule)
  hostId: number;

  @ManyToOne((type) => Room, (room) => room.schedule)
  roomId: number;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Attendee, (attendee) => attendee.scheduleId)
  attendee: Attendee[];
}
