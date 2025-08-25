import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET as string,
      signOptions: {
        expiresIn: '60m'
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
