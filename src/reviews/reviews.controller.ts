import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ReviewsService } from './reviews.service';
  import { CreateReviewDto, UpdateReviewDto } from 'src/validators/reviews.validator';
  import { Review } from './reviews.model';
  
  @Controller('reviews')
  export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}
  
    // Create a review
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
      return this.reviewsService.createReview(createReviewDto);
    }
  
    // Get all reviews
    @Get()
    async findAll(): Promise<Review[]> {
      return this.reviewsService.findAll();
    }
  
    // Get a single review by ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Review> {
      return this.reviewsService.findOne(id);
    }
  
    // Update a review by ID
    @Patch(':id')
    async update(
      @Param('id') id: number,
      @Body() updateReviewDto: UpdateReviewDto,
    ): Promise<Review> {
      const [_, [updatedReview]] = await this.reviewsService.update(id, updateReviewDto);
      return updatedReview;
    }
  
    // Delete a review by ID
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number): Promise<void> {
      return this.reviewsService.delete(id);
    }
  }
  