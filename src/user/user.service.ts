import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from './schema/user.schema';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserSchema | null> {
    return this.userModel.create(createUserDto); 
  }

  findAll() {
    return this.userModel.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      email
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
