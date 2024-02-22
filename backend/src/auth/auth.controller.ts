import { User } from '@prisma/client';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/request/SignUpRequest.dto';
import { SignInRequestDto } from './dto/request/SignInRequest.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  signin(@Body() signinDetails: SignInRequestDto) {
    return this.authService.signin(signinDetails);
  }
}
