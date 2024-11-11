import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './courses.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Course, User])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
