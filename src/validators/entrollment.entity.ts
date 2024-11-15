import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt({ message: 'User ID butun son bo`lishi kerak.' })
  userId: number;

  @IsInt({ message: 'Course ID butun son bo`lishi kerak.' })
  courseId: number;

  @IsOptional()
  @IsDateString({}, { message: 'Enrollment Date haqiqiy sana bo`lishi kerak.' })
  enrollmentDate?: Date;
}




export class UpdateEnrollmentDto {
  @IsOptional()
  @IsInt({ message: 'User ID butun son bo`lishi kerak.' })
  userId?: number;

  @IsOptional()
  @IsInt({ message: 'Course ID butun son bo`lishi kerak.' })
  courseId?: number;

  @IsOptional()
  @IsDateString({}, { message: 'Enrollment Date haqiqiy sana bo`lishi kerak.' })
  enrollmentDate?: Date;
}

