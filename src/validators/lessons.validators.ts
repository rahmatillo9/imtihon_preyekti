import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsDate, IsInt, Min } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @IsNotEmpty()
  courseId: number;

  @IsNotEmpty()
  teacherId: number;

  @IsString()
  @IsOptional()
  video_url?: string;

  @IsString()
  @IsOptional()
  videoFilename?: string;
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
    @Min(1, { message: 'Kurs ID noto`g`ri' })
    courseId?: number;
  
    @IsInt()
    @IsOptional()
    @Min(1, { message: 'O`qituvchi ID noto`g`ri' })
    teacherId?: number;


    @IsString()
    @IsOptional()
    videoPath?: string;

    @IsString()
    @IsOptional()
    videoFilename?: string;
  

    

  }