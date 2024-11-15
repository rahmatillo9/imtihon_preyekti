import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';
import { Course } from './courses.model';
import { User } from 'src/users/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Course, User])],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CoursesModule {}
