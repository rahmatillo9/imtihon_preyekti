import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './authguard/JwtModule ';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { LessonsModule } from './lessons/lessons.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { ReviewsModule } from './reviews/reviews.module';


import * as dotenv from "dotenv";
dotenv.config();
@Module({
  imports: [
    UsersModule,
    AuthModule,
   SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
   CoursesModule,
   EnrollmentsModule,
   AssignmentsModule,
   LessonsModule,
   SubmissionsModule,
   ReviewsModule,



  ],
})
export class AppModule {}