import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  @IsNumber()
  id: number;
}
