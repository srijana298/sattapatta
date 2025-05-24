import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Users } from 'src/users/entities/users.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([Booking, Users]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
