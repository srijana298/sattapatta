import {
  Body,
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  BadRequestException,
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
  async createUser(@Body() userDto: CreateUserDto): Promise<Partial<User>> {
    const { password, ...userData } =
      await this.usersService.createUser(userDto);
    return userData;
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
  async getProfile(@Request() req: AuthRequest) {
    const user = await this.usersService.findOne(req.user.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
