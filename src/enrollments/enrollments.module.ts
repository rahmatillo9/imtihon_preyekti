import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { Enrollment } from './entrollmen.entity';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.entity';

@Module({
  imports: [SequelizeModule.forFeature([Enrollment, User, Course])],
  providers: [EnrollmentsService],
  controllers: [EnrollmentsController],
})
export class EnrollmentsModule {}
