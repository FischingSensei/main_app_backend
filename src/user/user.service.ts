import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from './schema/user.schema';
import { TokensDto } from 'src/auth/dto/body/token-dto';
import { TokensSchema } from 'src/auth/schema/tokens.schema';

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

  async findByEmail(email: string): Promise<UserSchema | null> {
    return this.userModel.findOne({
      email
    });
  }

  async findById(id: string): Promise<UserSchema | null> {
    return this.userModel.findOne({
      _id: id
    });
  }

  async insertTokens(userSchema: UserSchema, tokensDto: TokensDto): Promise<TokensSchema | null> {
    return await this.userModel.findByIdAndUpdate(userSchema._id, {
      tokens: tokensDto
    },
    {
      new: false
    });
  }
    
  async insertTokensFromId(_id: string, tokensDto: TokensDto): Promise<TokensSchema | null> {
    return await this.userModel.findByIdAndUpdate(_id, {
      tokens: tokensDto
    },
    {
      new: false
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
