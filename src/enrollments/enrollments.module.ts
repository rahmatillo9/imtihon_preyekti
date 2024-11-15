import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnrollmentService } from './enrollments.service';
import { EnrollmentController } from './enrollments.controller';
import { Enrollment } from './entrollment.model';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([Enrollment, User, Course])],
  providers: [EnrollmentService],
  controllers: [EnrollmentController],
})
export class EnrollmentsModule {}
