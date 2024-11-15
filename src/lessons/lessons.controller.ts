import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto, UpdateLessonDto } from 'src/validators/lessons.validators';
import { Lesson } from './lessons.model';

@Controller('lessons')
export class LessonsController {

    constructor(private readonly LessonService: LessonsService){}
    @Post()
    async createLesson(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
      return this.LessonService.createLesson(createLessonDto); // CreateLessonDto to'liq yuborilmoqda
    }
    
    @Get()
    async findAll(): Promise<Lesson[]>{
        return this.LessonService.findAll();
    }

    @Get(':id')
    async findone(@Param('id') id: number): Promise<Lesson>{
        return this.LessonService.findone(id);
    }

    @Patch(':id')
    async updateLesson(@Param('id') id: number, @Body() updateLessonDto: UpdateLessonDto): Promise<Lesson> {
        const [affectedCount, affectedRows] = await this.LessonService.update(id, updateLessonDto);
        
        if (affectedCount === 0) {
            throw new NotFoundException(`Lesson with ID ${id} not found`);
        }
    
        return affectedRows[0]; 
    }

    @Delete(':id')
    async deleteLesson(@Param('id') id: number): Promise<void>{
        return this.LessonService.delete(id);
    }
    
}
