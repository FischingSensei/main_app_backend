import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/body/create-auth.dto';
import { UpdateAuthDto } from './dto/body/update-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserSchema } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  
  constructor(
    private userService: UserService,
   ) {}

  async create(createAuthDto: CreateAuthDto): Promise<IAuthResponseDto> {
    var user = await this.userService.findByEmail(createAuthDto.email);

    // Check if user exist
    if (user) {
      return {
        code: -1,
        message: "User already exist !"
      };
    }
   
    
    // if not then encode password and register to db
    createAuthDto.password = await bcrypt.hash(createAuthDto.password, 16);
    const userSchema: UserSchema = await this.userService.create(createAuthDto) as UserSchema;

    if (!userSchema) {
      return {
        code: -1,
        message: "Could not create user in database ! might be because of db connection"
      }
    }

    return {
      code: 1,
      message: "User successfully created !",
      body: {
        user: {
          _id: userSchema._id,
          firstname: userSchema.firstname,
          lastname: userSchema.lastname,
          email: userSchema.email
        } as User
      }
    }
  }

  findAll() {
    console.log("Hello world !");
    return this.userService.findAll().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
