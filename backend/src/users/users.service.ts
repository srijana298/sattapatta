import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createUser(payload: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.fullname = payload.fullname;
    user.email = payload.email;
    user.password = await bcrypt.hash(payload.password, 10);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: {
        fullname: true,
        email: true,
      },
    });
    return users;
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const confirmed = await bcrypt.compare(pass, user?.password);

    if (!confirmed) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'your_secret_key',
      }),
    };
  }
}
