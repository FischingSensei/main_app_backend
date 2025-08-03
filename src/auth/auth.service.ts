import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/body/create-auth.dto';
import { UpdateAuthDto } from './dto/body/update-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  
  constructor(
    private userService: UserService,
   ) {}

  async create(createAuthDto: CreateAuthDto): Promise<IAuthResponseDto> {
    const user = await this.userService.findByEmail(createAuthDto.email);

    console.log(user);
    // Check if user exist
    if (user) {
      return {
        code: -1,
        message: "User already exist !"
      };
    }
   
    console.log( process.env.BCRYPT_SALT);
    // if not then encode password and register to db
    {
      createAuthDto.password = await bcrypt.hash(createAuthDto.password, 16);
      this.userService.create(createAuthDto);
    }

    return {
      code: 1,
      message: "User successfully created !"
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
