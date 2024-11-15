import { Column, DataType, Model, Table} from "sequelize-typescript";


@Table({
  tableName: 'users4',
  timestamps: true
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Lastname!: string;

  @Column({
    type: DataType.ENUM('student', 'teacher', 'admin'),
    allowNull: false,
  })
  role!: string;
   
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;



}