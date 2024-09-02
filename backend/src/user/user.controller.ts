import { CheckCookieExistsInterceptor } from './interceptor/check_cookie_exists.interceptor';
import { CheckIdExistsInterceptor } from './interceptor/check_id_exists.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { AdminGuard } from './guard';
import { UpdateUserRequestDto } from './dto/request/UpdateUserRequest.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

//every route requires a token

@ApiTags('User')
// @UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseInterceptors(CheckCookieExistsInterceptor)
  getMe(@GetUser() user: User, @Req() req: Request) {
    console.log('from request cookies', req.cookies.ACCESS_TOKEN);
    console.log('from controller');
    console.log('selected user', user);

    return user;
  }

  @UseGuards(AdminGuard)
  @Get()
  getAllUsers() {
    // console.log('request', req.cookies.ACCESS_TOKEN);
    return this.userService.findAll();
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @UseInterceptors(CheckIdExistsInterceptor)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @UseInterceptors(CheckIdExistsInterceptor)
  @UseGuards(AdminGuard)
  @Put(':id')
  editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDetails: UpdateUserRequestDto,
  ) {
    return this.userService.edit(id, updateUserDetails);
  }
}
