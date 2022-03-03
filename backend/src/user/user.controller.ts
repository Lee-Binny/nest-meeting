import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).send({
      ok: true,
      data: user,
    });
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto, @Res() res) {
    await this.userService.signIn(signInUserDto);
    return res.status(HttpStatus.OK).send({
      ok: true,
    });
  }

  @Get()
  async findAll(@Res() res) {
    return res.status(HttpStatus.OK).send({
      ok: true,
      data: await this.userService.findAll(),
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    await this.userService.remove(+id);
    return res.status(HttpStatus.OK).send({
      ok: true,
    });
  }
}
