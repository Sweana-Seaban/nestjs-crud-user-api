import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/request/SignUpRequest.dto';
import { SignInRequestDto } from './dto/request/SignInRequest.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Created user object as response',
  })
  @ApiBadRequestResponse({
    description: 'User cannot signup.Try again!',
  })
  signup(@Body() signupDetails: SignUpRequestDto) {
    console.log(signupDetails);
    return this.authService.signup(signupDetails);
  }

  @Post('signin')
  async signin(@Body() signinDetails: SignInRequestDto, @Res() res: Response) {
    const token = await this.authService.signin(signinDetails);
    res.cookie('ACCESS_TOKEN', token, { maxAge: 0 });
    return res.send({ access_token: token });
  }
}
