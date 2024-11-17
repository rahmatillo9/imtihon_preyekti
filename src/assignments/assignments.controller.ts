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
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from 'src/validators/assignments.entity';
import { Assignment } from './assignments.model';
import { RolesGuard } from 'src/validators/RolesGuard/Roluse.guard';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { Role } from 'src/validators/users.validator';
import { Roles } from 'src/validators/RolesGuard/Roles';

@UseGuards(JwtAuthGuard, RolesGuard) 
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // Admin va Teacher roli uchun topshiriq yaratish
  @Roles(Role.Admin, Role.Teacher)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAssignment(@Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentsService.createAssignment(createAssignmentDto);
  }

  // Admin va Teacher roli uchun barcha topshiriqlarni ko'rish
  @Roles(Role.Admin, Role.Teacher)
  @Get()
  async findAll(): Promise<Assignment[]> {
    return this.assignmentsService.findAll();
  }

  // Admin va Teacher roli uchun topshiriqning deadline'ini yangilash
  @Roles(Role.Admin, Role.Teacher)
  @Patch(':id/deadline')
  async setAssignmentDeadline(
    @Param('id') id: number,
    @Body('dueDate') dueDate: Date,
  ): Promise<Assignment> {
    return this.assignmentsService.setAssignmentDeadline(id, dueDate);
  }

  // Admin va Teacher roli uchun o'qituvchi bilan topshiriqlarni ko'rish
  @Roles(Role.Admin, Role.Teacher)
  @Get('/ByTeacher')
  async findAllWithTeacher(): Promise<Assignment[]> {
    return this.assignmentsService.findAllWithTeacher();
  }

  // Admin, Teacher va Student roli uchun topshiriqni ID bo'yicha ko'rish
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Assignment> {
    return this.assignmentsService.findOne(id);
  }

  // Admin, Teacher va Student roli uchun kurs bo'yicha topshiriqlarni ko'rish
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get('course/:courseId')
  async findAssignmentsByCourse(@Param('courseId') courseId: number): Promise<Assignment[]> {
    return this.assignmentsService.findAssignmentsByCourse(courseId);
  }

  // Admin va Teacher roli uchun topshiriqni yangilash
  @Roles(Role.Admin, Role.Teacher)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const [_, [updatedAssignment]] = await this.assignmentsService.update(id, updateAssignmentDto);
    return updatedAssignment;
  }

  // Faqat Admin roli uchun topshiriqni o'chirish
  @Roles(Role.Admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.assignmentsService.delete(id);
  }
}
