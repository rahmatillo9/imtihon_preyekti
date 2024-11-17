import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './courses.model';
import { User } from 'src/users/users.entity';
import { Enrollment } from 'src/enrollments/entrollment.model';


@Module({
  imports:  [ SequelizeModule.forFeature([Course, Enrollment, User])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
