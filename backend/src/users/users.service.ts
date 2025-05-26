import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Mentor } from 'src/mentor/entities/mentor.entity';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Mentor)
    private readonly mentorRepository: Repository<Mentor>,
  ) {}

  async createUser(payload: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.fullname = payload.fullname;
    user.email = payload.email;
    user.role = payload.role;
    user.password = await bcrypt.hash(payload.password, 10);

    const saved = await this.usersRepository.save(user);
    // if (user.role === 'mentor') {
    //   const mentor = new Mentor();
    //   mentor.user = saved;
    //   await this.mentorRepository.save(mentor);
    // }
    return saved;
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
      relations: ['mentor_profile'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const confirmed = await bcrypt.compare(pass, user?.password);

    if (!confirmed) {
      throw new UnauthorizedException();
    }

    const { password, ...payload } = user;
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'your_secret_key',
      }),
    };
  }
}
