import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto, UpdateLessonDto } from 'src/validators/lessons.validators';
import { Lesson } from './lessons.model';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { RolesGuard } from 'src/validators/RolesGuard/Roluse.guard';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { Roles } from 'src/validators/RolesGuard/Roles';
import { Role } from 'src/validators/users.validator';

// File storage configuration for video upload
const filename = (req, file, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
};

const fileFilter = (req, file, callback) => {
  const isValidType = file.mimetype.startsWith('video/');
  if (isValidType) {
    callback(null, true);
  } else {
    callback(new BadRequestException('Invalid format! Only video files are allowed.'), false);
  }
};

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonService: LessonsService) {}

  // Faqat Admin va Teacher dars yaratishi mumkin
  @Roles(Role.Admin, Role.Teacher)
  @Post()
  @UseInterceptors(
    FileInterceptor('video_url', {
      storage: diskStorage({
        destination: './lesson_uploads',
        filename: filename,
      }),
      fileFilter: fileFilter,
    }),
  )
  create(@UploadedFile() video_url: Express.Multer.File, @Body() createLessonDto: CreateLessonDto) {
    if (!video_url) {
      throw new BadRequestException('File upload failed');
    }

    createLessonDto.video_url = video_url.filename;
    return this.lessonService.createLesson(createLessonDto);
  }

  // Admin, Teacher, va Student dars video faylini ko'rishi mumkin
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id/video')
  async getLessonVideo(@Param('id') id: number) {
    return this.lessonService.getLessonVideo(id);
  }

  // Admin, Teacher, va Student dars materialini ko'rishi mumkin
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id/material')
  async getLessonMaterial(@Param('id') id: number) {
    return this.lessonService.getvideoFile(id);
  }

  // Barcha darslarni Admin, Teacher, va Student ko'rishi mumkin
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get()
  async findAll(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }

  // Darsni ID bo'yicha topish (Admin, Teacher, va Student uchun)
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id')
  async findone(@Param('id') id: number): Promise<Lesson> {
    const lesson = await this.lessonService.findone(id);
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  // Admin va Teacher darsni yangilashi mumkin
  @Roles(Role.Admin, Role.Teacher)
  @Patch(':id')
  async updateLesson(@Param('id') id: number, @Body() updateLessonDto: UpdateLessonDto): Promise<Lesson | null> {
    const [affectedCount, affectedRows] = await this.lessonService.update(id, updateLessonDto);

    if (affectedCount === 0) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return affectedRows[0] || null;
  }

  // Admin va Teacher darsni o'chirishi mumkin
  @Roles(Role.Admin, Role.Teacher)
  @Delete(':id')
  async deleteLesson(@Param('id') id: number): Promise<void> {
    return this.lessonService.delete(id);
  }
}
