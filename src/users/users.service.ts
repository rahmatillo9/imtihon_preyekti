import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.entity';
import * as bcrypt from "bcryptjs"

@Injectable()
export class UsersService {
 constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
 ){}

 async createUser(Lastname: string, role: string, email: string, password: string): Promise<User>{
    const hashPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({Lastname, role, email, password: hashPassword});

 }

 async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword); 
  }

  async findAll(): Promise<User[]>{
    return this.userModel.findAll();

  }

  async findOne(id: number): Promise<User>{
    return this.userModel.findOne({
        where:{id},
        attributes: ['id', 'Lastname', 'role', 'email', 'password' ],
    });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<[number, User[]]>{
    return this.userModel.update(userData,{
        where: {id},
        returning: true,
    });
  }
  
  async findByEmail(email: string): Promise<User | null> {
    console.log('findByEmail service', email)
    return this.userModel.findOne({ where: { email } }); // id o'rniga email bo'yicha qidirish
  }

  async deleteUser(id: number): Promise<void>{
    const user = await this.userModel.findOne({ where: { id } });
    if(user){
        await user.destroy();
    }
  }





}
