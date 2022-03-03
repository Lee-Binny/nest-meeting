import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';
import * as bcrypt from "bcrypt";
import {HttpException, HttpStatus} from "@nestjs/common";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 45 })
  userId: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 7 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => Schedule, (schedule) => schedule.hostId)
  schedule: Schedule[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new HttpException(
          { ok: false, message: 'not hashed password' },
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
