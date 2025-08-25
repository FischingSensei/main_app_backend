import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/body/create-auth.dto';
import { UpdateAuthDto } from './dto/body/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserSchema } from 'src/user/schema/user.schema';
import { AAuthform } from './dto/body/a-auth-form.dto';
import { AAuthResponseDto } from './dto/response/Aauth-response.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './entities/tokens.entity';
import { VerifyResponseDto } from './dto/response/verify-response.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
        message: "Wrong email or assword !"
      }
    }

    const passwordChecker: boolean = await bcrypt.compare(loginDto.password, userSchema.password as string);
    if (!passwordChecker) {
      this.logger.error(`Different password has been typed ${userSchema.email}`);
      return {
        code: -1,
        message: "Wrong email or password !"
      }
    }

    // generate new access and refresh tokens 
    const tokens = await this.generateTokens(userSchema, true);

    return {
      code: 1,
      message: "Successfully logged-in",
      body: {
        user: {
          _id: userSchema._id,
          email: userSchema.email,
          firstname: userSchema.firstname,
          lastname: userSchema.lastname,
          tokens
        } as User
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

    // generate and save access and refresh token into db
    const tokens = await this.generateTokens(userSchema, true);

    if (!tokens) {
      this.logger.error("tokens is null this should not happend");
      return {
        code: -1,
        message: "Wtf",
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
          email: userSchema.email,
          tokens: {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
          }
        } as User
      }
    }
  }

  async generateTokens(userSchema: UserSchema, insert=false): Promise<Tokens | null> {
    const payload = { email: userSchema.email, _id: userSchema._id };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '3600s',
      }),

      this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    ]);
    
    if (insert) {
      await this.userService.insertTokens(userSchema, {
        accessToken,
        refreshToken
      }) as unknown as Tokens;
    }
    return {
      accessToken,
      refreshToken
    };
  } 

  async verifyTokens(userId: string, tokens: Tokens): Promise<VerifyResponseDto> {
    let payload = {};

    try {
      payload = await this.jwtService.verifyAsync(tokens.refreshToken);  
      const user: UserSchema | null = await this.userService.findById(userId);
      
      if (payload["_id"] !== userId || user === null || user?.tokens.refreshToken !== tokens.refreshToken) { 
        payload = {};
        this.logger.error("User does not match jwt token");
        throw new UnauthorizedException();
      }

      const payloadDup = { email: payload["email"], _id: payload["_id"] };

      tokens.accessToken = await this.jwtService.signAsync(payloadDup, {
        expiresIn: '3600s' 
      });

      await this.userService.insertTokensFromId(payload["_id"], tokens);

      this.logger.log("Successfully verified user " + userId);

      return {
        code: 1,
        message: "Successfully verified !",
        body: {
          _id: payload["_id"],
          tokens,
        }
      }
    } catch(e) {
      this.logger.error("Couldn't verify refreshToken token might not be valid: " + e);
      throw new UnauthorizedException();
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
