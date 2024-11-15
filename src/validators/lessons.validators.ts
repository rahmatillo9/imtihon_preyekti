import { IsString, IsNotEmpty, IsOptional, IsDate, IsInt, Min } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty({ message: 'Dars nomi majburiy' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsNotEmpty({ message: 'Dars boshlanish vaqti majburiy' })
  startTime: Date;

  @IsDate()
  @IsNotEmpty({ message: 'Dars tugash vaqti majburiy' })
  endTime: Date;

  @IsInt()
  @Min(1, { message: 'Kurs ID noto‘g‘ri' })
  courseId: number;

  @IsInt()
  @Min(1, { message: 'O‘qituvchi ID noto‘g‘ri' })
  teacherId: number;
}



export class UpdateLessonDto {
    @IsString()
    @IsOptional()
    title?: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsDate()
    @IsOptional()
    startTime?: Date;
  
    @IsDate()
    @IsOptional()
    endTime?: Date;
  
    @IsInt()
    @IsOptional()
    @Min(1, { message: 'Kurs ID noto‘g‘ri' })
    courseId?: number;
  
    @IsInt()
    @IsOptional()
    @Min(1, { message: 'O‘qituvchi ID noto‘g‘ri' })
    teacherId?: number;
  }