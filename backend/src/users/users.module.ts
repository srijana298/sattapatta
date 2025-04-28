import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
