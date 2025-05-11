import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { Mentor } from 'src/mentor/entities/mentor.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([Users, Mentor]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
