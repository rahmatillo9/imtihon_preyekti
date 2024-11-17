import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './lessons.model';
import { CreateLessonDto } from 'src/validators/lessons.validators';
import { Course } from 'src/courses/courses.model';
import { User } from 'src/users/users.entity';

@Injectable()
export class LessonsService {
    constructor(
        @InjectModel(Lesson)
        private readonly lessonModel: typeof Lesson,
    ){}
    

    async createLesson(CreateLessonDto: CreateLessonDto): Promise<Lesson>{
        return this.lessonModel.create(CreateLessonDto)
    }

    async findAll(): Promise<Lesson[]>{
        return this.lessonModel.findAll({
            include: [
                {
                  model: Course,
                  as: 'course', 
                  attributes: ['title', 'category'], 
                  include: [
                    {
                      model: User,
                      as: 'teacher',
                      attributes: ['FirstName', 'LastName'], 
                      required: false, 
                    },
                  ],
                },

              ],
              attributes: [ 'title', 'description', 'startTime', 'endTime'], 
            });
        
    }

    async findone(id: number): Promise<Lesson>{
        return this.lessonModel.findOne({
            where: {id},

            include: [
                {
                  model: Course,
                  as: 'course', 
                  attributes: ['title', 'category'], 
                  include: [
                    {
                      model: User,
                      as: 'teacher',
                      attributes: ['FirstName', 'LastName'], 
                      required: false, 
                    },
                  ],
                },

              ],
              attributes: [ 'title', 'description', 'startTime', 'endTime'], 
            });
        
    }

    async update( id:number,  LessonData: Partial<Lesson> ): Promise< [number,Lesson[]]>{
        return this.lessonModel.update(LessonData, {
            where: {id},
            returning: true
       });
    }


    async getLessonVideo(id: number): Promise<{ video_url: string }> {
      const lesson = await this.lessonModel.findOne({
          where: { id },
          attributes: ['video_url'],
      });
  
      if (!lesson) {
          throw new NotFoundException(`Lesson with ID ${id} not found`);
      }
  
      return { video_url: lesson.video_url };
  }
  
  async getvideoFile(id: number): Promise<{ video_url: string }> {
    const lesson = await this.lessonModel.findOne({
        where: { id },
        attributes: ['videoFilename'], 
    });

    if (!lesson || !lesson.videoFilename) {
        throw new NotFoundException(`Lesson with ID ${id} not found or has no video`);
    }

    const video_url = `http://example.com/uploads/${lesson.videoFilename}`;
    return { video_url };
}

  


    async delete(id: number): Promise<void>{
        const lesson = await this.lessonModel.findOne({ where: { id }});
        if(lesson){
            await lesson.destroy()
        }
    }


  
}
