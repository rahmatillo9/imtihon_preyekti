import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { User } from 'src/users/users.entity';
import { Lesson } from 'src/lessons/lessons.model';

@Module({
  imports: [SequelizeModule.forFeature([Review, User, Lesson ])],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
