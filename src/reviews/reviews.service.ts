import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { CreateReviewDto, UpdateReviewDto } from 'src/validators/reviews.validator';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewModel: typeof Review,
  ) {}

  // Create a review
  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(createReviewDto);
  }

  // Find all reviews
  async findAll(): Promise<Review[]> {
    return this.reviewModel.findAll();
  }

  // Find a single review by ID
  async findOne(id: number): Promise<Review> {
    return this.reviewModel.findOne({
      where: { id },
    });
  }

  // Update a review
  async update(id: number, reviewData: UpdateReviewDto): Promise<[number, Review[]]> {
    return this.reviewModel.update(reviewData, {
      where: { id },
      returning: true,
    });
  }

  // Delete a review
  async delete(id: number): Promise<void> {
    const review = await this.reviewModel.findOne({ where: { id } });
    if (review) {
      await review.destroy();
    }
  }
}
