import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/body/create-auth.dto';
import { UpdateAuthDto } from './dto/body/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserSchema } from 'src/user/schema/user.schema';
import { AAuthform } from './dto/body/a-auth-form.dto';
import { AAuthResponseDto } from './dto/response/Aauth-response.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';

import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
  ) {}

  private readonly logger: Logger = new Logger(AuthService.name, { timestamp: true });

  async login(loginDto: AAuthform): Promise<AAuthResponseDto | AuthResponseDto> {

    // Check if user exist in database with provided email
    const userSchema = await this.userService.findByEmail(loginDto.email);

    // If not then user is not registered
    if (!userSchema) {
      this.logger.error("No user exist with the provided email " + loginDto.email);
      return {
        code: -1,
        message: "Wrong email or password !"
      }
    }

    const passwordChecker: boolean = await bcrypt.compare(loginDto.password, userSchema.password as string);
    if (!passwordChecker) {
      this.logger.error(`Different password has been typed ${userSchema.email}`)
      return {
        code: -1,
        message: "Wrong email or password !"
      }
    }
  
    return {
      code: 1,
      message: "Successfully logged-in",
      body: {
        user: {
          _id: userSchema._id as UUID,
          email: userSchema.email as string,
          firstname: userSchema.firstname as string,
          lastname: userSchema.lastname as string
        }
      }
    }
  }

  async register(createAuthDto: CreateAuthDto): Promise<AAuthResponseDto | AuthResponseDto> {
    const user = await this.userService.findByEmail(createAuthDto.email);

    // Check if user exist
    if (user) {
      this.logger.error(`User ${createAuthDto.email} already exist !`);
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
