import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lesson } from 'src/lessons/lessons.model';
import { User } from '../users/users.entity';

@Table({ tableName: 'reviews', timestamps: true })
export class Review extends Model<Review> {
  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lessonId: number;

  @BelongsTo(() => Lesson)
  lesson: Lesson;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating: number;  // 1-5 oralig'ida reyting

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  feedback: string; // Talabalar tomonidan yozilgan fikr
}
