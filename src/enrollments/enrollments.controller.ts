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
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from 'src/validators/entrollment.entity';
import { Enrollment } from './entrollment.model';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { RolesGuard } from 'src/validators/RolesGuard/Roluse.guard';
import { Roles } from 'src/validators/RolesGuard/Roles';
import { Role } from 'src/validators/users.validator';

@UseGuards(JwtAuthGuard, RolesGuard) // Foydalanuvchining roli va autentifikatsiyasi tekshiriladi
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  // Admin, Teacher, va Student roli bilan kirishga ruxsat beriladi
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEnrollment(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<Enrollment> {
    return this.enrollmentsService.createEnrollment(createEnrollmentDto);
  }

  // Admin va Teacher roli uchun enrollmentsni ko'rish
  @Roles(Role.Admin, Role.Teacher)
  @Get()
  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentsService.findAll();
  }

  // Admin, Teacher va Student roli uchun enrollmentsni id orqali ko'rish
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Enrollment> {
    return this.enrollmentsService.findOne(id);
  }

  // Admin va Teacher roli uchun enrollmentsni yangilash
  @Roles(Role.Admin, Role.Teacher)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    const [_, [updatedEnrollment]] = await this.enrollmentsService.update(
      id,
      updateEnrollmentDto,
    );
    return updatedEnrollment;
  }

  // Admin roli uchun enrollmentsni o'chirish
  @Roles(Role.Admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.enrollmentsService.delete(id);
  }
}
