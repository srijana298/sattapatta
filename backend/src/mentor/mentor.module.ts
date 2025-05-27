import { Module } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { MentorController } from './mentor.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Mentor } from './entities/mentor.entity';
import { MentorCertificate } from './entities/certificate.entity';
import { MentorEducation } from './entities/education.entity';
import { MentorAvailability } from './entities/availability.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([
      Users,
      Mentor,
      MentorCertificate,
      MentorEducation,
      MentorAvailability,
    ]),
  ],
  controllers: [MentorController],
  providers: [MentorService, UsersService],
})
export class MentorModule {}
