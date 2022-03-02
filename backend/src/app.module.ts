import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './room/room.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AttendeeModule } from './attendee/attendee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    RoomModule,
    ScheduleModule,
    AttendeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
