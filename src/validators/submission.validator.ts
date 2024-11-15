import { IsInt, IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateSubmissionDto {
  @IsInt()
  @IsNotEmpty({ message: 'Topshiriq ID noto‘g‘ri' })
  assignmentId: number;

  @IsInt()
  @IsNotEmpty({ message: 'Talaba ID noto‘g‘ri' })
  userId: number;

  @IsString()
  @IsNotEmpty({ message: 'Topshiriq havolasi majburiy' })
  submissionLink: string;

  @IsDate()
  @IsNotEmpty({ message: 'Topshiriq vaqti majburiy' })
  submittedAt: Date;
}


export class UpdateSubmissionDto {
    @IsInt()
    @IsOptional()
    grade?: number; // O'qituvchi tomonidan baho berilgan bo'lsa
  
    @IsString()
    @IsOptional()
    feedback?: string; // O'qituvchi fikri
  
    @IsDate()
    @IsOptional()
    submittedAt?: Date; // Agar vaqtni yangilash zarur bo'lsa
  }