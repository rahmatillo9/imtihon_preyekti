import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.entity';

@Table({
  tableName: 'enrollments',
  timestamps: true,
})
export class Enrollment extends Model<Enrollment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  enrollmentDate: Date;
}
