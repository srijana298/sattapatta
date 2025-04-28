import {
  Body,
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import { AuthGuard } from 'src/auth.guard';
import { AuthRequest } from 'src/AuthRequest';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    const { password, ...user } = await this.usersService.createUser(userDto);
    return user;
  }

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Post('/login')
  async login(
    @Body() userDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return await this.usersService.signIn(userDto.email, userDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}
