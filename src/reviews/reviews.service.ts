import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { CreateReviewDto, UpdateReviewDto } from 'src/validators/reviews.validator';
import { Lesson } from 'src/lessons/lessons.model';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewModel: typeof Review,
  ) {}

  
  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(createReviewDto);
  }


  async findAll(): Promise<Review[]> {
    return this.reviewModel.findAll({
       
      include: [
        {
          model: User,
          as: 'user', 
          attributes: ['LirstName', 'LastName'],
        },
        {
          model: Lesson,
          as: 'lesson', 
          attributes: ['title', 'description'], 
        },
      ],
      attributes: ['id', 'rating', 'feedback'], 
    });


    
  }

 
  async findOne(id: number): Promise<Review> {
    return this.reviewModel.findOne({
      where: { id },

      include: [
        {
          model: User,
          as: 'user', 
          attributes: ['LirstName', 'LastName'],
        },
        {
          model: Lesson,
          as: 'lesson', 
          attributes: ['title', 'description'], 
        },
      ],
      attributes: ['id', 'rating', 'feedback'], 
    });
  }


  async update(id: number, reviewData: UpdateReviewDto): Promise<[number, Review[]]> {
    return this.reviewModel.update(reviewData, {
      where: { id },
      returning: true,
    });
  }


  async delete(id: number): Promise<void> {
    const review = await this.reviewModel.findOne({ where: { id } });
    if (review) {
      await review.destroy();
    }
  }
}
