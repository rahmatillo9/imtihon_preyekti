import { IsInt, IsNotEmpty, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt({ message: 'Course ID butun son bo`lishi kerak.' })
  courseId: number;

  @IsDateString({}, { message: 'Due Date haqiqiy sana formatida bo`lishi kerak.' })
  dueDate: Date;

  @IsString({ message: 'Description matn bo`lishi kerak.' })
  @IsNotEmpty({ message: 'Description bo`sh bo`lishi mumkin emas.' })
  description: string;
}




export class UpdateAssignmentDto {
  @IsOptional()
  @IsInt({ message: 'Course ID butun son bo`lishi kerak.' })
  courseId?: number;

  @IsOptional()
  @IsDateString({}, { message: 'Due Date haqiqiy sana formatida bo`lishi kerak.' })
  dueDate?: Date;

  @IsOptional()
  @IsString({ message: 'Description matn bo`lishi kerak.' })
  description?: string;
}
