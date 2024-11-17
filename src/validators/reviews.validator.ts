import { IsInt, IsNotEmpty, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Dars ID noto`g`ri' })
  lessonId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Foydalanuvchi ID noto`g`ri' })
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Reyting 1 dan 5 gacha bo`lishi kerak' })
  @Max(5, { message: 'Reyting 1 dan 5 gacha bo`lishi kerak' })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  feedback?: string;
}


export class UpdateReviewDto {
    @IsInt()
    @IsOptional()
    @Min(1, { message: 'Reyting 1 dan 5 gacha bo`lishi kerak' })
    @Max(5, { message: 'Reyting 1 dan 5 gacha bo`lishi kerak' })
    rating?: number;
  
    @IsString()
    @IsOptional()
    feedback?: string;
  }