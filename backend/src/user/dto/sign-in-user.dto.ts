import {OmitType} from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class SignInUserDto extends OmitType(CreateUserDto, ['name'] as const) {}