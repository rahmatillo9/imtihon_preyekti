import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from './lessons.model';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([Lesson, User, Course])],
  providers: [LessonsService],
  controllers: [LessonsController]
})
export class LessonsModule {}
