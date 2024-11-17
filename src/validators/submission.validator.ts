import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsDate, IsOptional, IsNumber, Min, Max, IsBoolean } from 'class-validator';

export class CreateSubmissionDto {
  @IsInt()
  assignmentId: number;

  @IsInt()
  userId: number;

  @IsString()
  submissionLink: string;

  @Type(() => Date)
  @IsDate()
  submittedAt: Date;

  @IsInt()
  grade: number;

  @IsString()
  feedback: string;

  @IsBoolean()
  isSubmitted: boolean;
}


export class UpdateSubmissionDto {
    @IsInt()
    @IsOptional()
    grade?: number;
  
    @IsString()
    @IsOptional()
    feedback?: string; 
  
    @IsDate()
    @IsOptional()
    submittedAt?: Date; 

    @IsBoolean()
    @IsOptional()
    isSubmitted?: boolean;
  }

 

export class GradeSubmissionDto {
  @IsNumber()
  @Min(0)
  @Max(100) 
  @IsNotEmpty()
  grade: number;
}
