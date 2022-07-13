import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { User } from '@/api/user/user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private async register(@Body() body: RegisterDto): Promise<ResponseDto> {
    const data = await this.service.register(body);
    return {
      statusCode: 200,
      message: 'Success',
      data,
    };
  }

  @Post('login')
  private async login(@Body() body: LoginDto): Promise<ResponseDto> {
    const accessToken = await this.service.login(body);
    const data = { accessToken };
    return {
      statusCode: 200,
      message: 'Success',
      data,
    };
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private async refresh(@Req() req: Request): Promise<ResponseDto> {
    const accessToken = await this.service.refresh(<User>req['user']);
    const data = { accessToken };
    return {
      statusCode: 200,
      message: 'Success',
      data,
    };
  }
}
