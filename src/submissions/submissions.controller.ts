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
  Put,
  UseGuards,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto, GradeSubmissionDto, UpdateSubmissionDto } from 'src/validators/submission.validator';
import { Submission } from './submissions.model';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { RolesGuard } from 'src/validators/RolesGuard/Roluse.guard';
import { Roles } from 'src/validators/RolesGuard/Roles';
import { Role } from 'src/validators/users.validator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  // Faqat Admin, Teacher va Student o'z submissionsini yaratishi mumkin
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSubmission(@Body() createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    return this.submissionsService.createSubmission(createSubmissionDto);
  }

  // Admin va Teacher submissionni baholashi mumkin
  @Roles(Role.Admin, Role.Teacher)
  @Put(':id/grade')
  async gradeSubmission(
    @Param('id') id: number,
    @Body() gradeData: GradeSubmissionDto,
  ): Promise<Submission> {
    const { grade } = gradeData;
    return this.submissionsService.gradeSubmission(id, grade);
  }

  // Barcha foydalanuvchilar (Admin, Teacher, Student) submissionlarni ko'rishi mumkin,
  // lekin Student faqat o'zining submissionini ko'radi
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get()
  async findAll(): Promise<Submission[]> {
    return this.submissionsService.findAll();
  }

  // Barcha foydalanuvchilar submissionni ko'rishi mumkin,
  // lekin Student faqat o'zining submissionini ko'radi
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Submission> {
    return this.submissionsService.findOne(id);
  }

  // Faqat Admin, Teacher va Student o'z submissionlarini yangilashi mumkin
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<Submission> {
    const [_, [updatedSubmission]] = await this.submissionsService.update(id, updateSubmissionDto);
    return updatedSubmission;
  }

  // Faqat Admin va Teacher submissionlarni o'chirishi mumkin
  @Roles(Role.Admin, Role.Teacher)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.submissionsService.delete(id);
  }
}
