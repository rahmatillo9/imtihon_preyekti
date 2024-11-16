import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';
import { Enrollment } from 'src/enrollments/entrollment.model';
import { Lesson } from 'src/lessons/lessons.model';

@Table({
  tableName: 'courses',
  timestamps: true,
})
export class Course extends Model<Course> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  teacherId: number;

  @BelongsTo(() => User)
  teacher: User;
  @HasMany(() => Lesson)
  lessons: Lesson[];
  
  @HasMany(() => Enrollment)
  enrollments: Enrollment[];
}
