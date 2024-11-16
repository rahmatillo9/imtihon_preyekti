import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './courses.model';
import { User } from 'src/users/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Course, User])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
