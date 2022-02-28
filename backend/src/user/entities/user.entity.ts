import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field((type) => Number)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field((type) => String)
  @Column({ length: 45 })
  userId: string;

  @Field((type) => String)
  @Column({ length: 100 })
  password: string;

  @Field((type) => String)
  @Column({ length: 7 })
  name: string;

  @Field((type) => Date)
  @CreateDateColumn()
  createdAd: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => Date)
  @DeleteDateColumn()
  deletedAt: Date;
}
