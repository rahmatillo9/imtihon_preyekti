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
import { CoursesService } from './courses.service';
import { CreatecourseDto, UpdateCourseDto } from 'src/validators/courses.validator';
import { Course } from './courses.model';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { RolesGuard } from 'src/validators/RolesGuard/Roluse.guard';
import { Roles } from 'src/validators/RolesGuard/Roles';
import { Role } from 'src/validators/users.validator';

@UseGuards(JwtAuthGuard, RolesGuard) // Foydalanuvchining roli va autentifikatsiyasi tekshiriladi
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Admin, Teacher va Student roli uchun kurs yaratishga ruxsat beriladi
  @Roles(Role.Admin, Role.Teacher)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCourse(@Body() createCourseDto: CreatecourseDto): Promise<Course> {
    return this.coursesService.createCourse(createCourseDto);
  }

  // Admin va Teacher roli uchun barcha kurslarni ko'rish
  @Roles(Role.Admin, Role.Teacher)
  @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  // Admin va Teacher roli uchun kategoriya bo'yicha kurslarni ko'rish
  @Roles(Role.Admin, Role.Teacher)
  @Get('/category/:category')
  async getBycategory(@Param('category') category: string): Promise<Course[]> {
    return this.coursesService.findByCategory(category);
  }

  // Admin, Teacher va Student roli uchun kursni id orqali ko'rish
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  // Admin va Teacher roli uchun kursni yangilash
  @Roles(Role.Admin, Role.Teacher)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const [_, [updatedCourse]] = await this.coursesService.update(id, updateCourseDto);
    return updatedCourse;
  }

  // Faqat Admin roli uchun kursni o'chirish
  @Roles(Role.Admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.coursesService.delete(id);
  }
}
