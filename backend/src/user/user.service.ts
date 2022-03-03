import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/sign-in-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExistedId = await this.userRepository.findOne({
      where: {
        userId: createUserDto.userId,
      },
    });
    if (isExistedId) {
      throw new HttpException(
        {
          ok: false,
          message: `${createUserDto.userId} is already existed user id in DB`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async signIn(signInUserDto: SignInUserDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        userId: signInUserDto.userId,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          ok: false,
          message: `${signInUserDto.userId} is not found in DB`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isSuccess = await bcrypt.compare(
      signInUserDto.password,
      user.password,
    );
    if (!isSuccess) {
      throw new HttpException(
        {
          ok: false,
          message: 'not matched id or password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return this.userRepository.find({ select: ['id', 'userId', 'name'] });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
          {
            ok: false,
            message: `id ${id}, is not found inDB`,
          },
          HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.delete({ id });
  }
}
