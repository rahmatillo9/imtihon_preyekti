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
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from 'src/validators/reviews.validator';
import { Review } from './reviews.model';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { RolesGuard } from 'src/validators/RolesGuard/Roluse.guard';
import { Role } from 'src/validators/users.validator';
import { Roles } from 'src/validators/RolesGuard/Roles';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Faqat Admin, Teacher va Student o'z reviewlarini yaratishi mumkin
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.createReview(createReviewDto);
  }

  // Admin va Teacher barcha reviewlarni ko'rishi mumkin, 
  // Student faqat o'zining reviewlarini ko'radi
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  // Admin va Teacher barcha reviewlarni ko'rishi mumkin, 
  // Student faqat o'zining reviewini ko'radi
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  // Faqat Admin, Teacher va Student o'z reviewlarini yangilashi mumkin
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const [_, [updatedReview]] = await this.reviewsService.update(id, updateReviewDto);
    return updatedReview;
  }

  // Faqat Admin va Teacher reviewlarni o'chirishi mumkin, 
  // Student faqat o'zining reviewini o'chirishi mumkin
  @Roles(Role.Admin, Role.Teacher)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.reviewsService.delete(id);
  }
}
