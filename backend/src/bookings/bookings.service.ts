import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findExistingBooking(
    mentorId: number,
    menteeId: number,
    startDate: string,
    endTime: string,
  ): Promise<Booking | null> {
    return this.bookingRepository.findOne({
      where: {
        mentor: {
          id: mentorId,
        },
        mentee: {
          id: menteeId,
        },
        start_date: startDate,
        end_time: endTime,
      },
    });
  }

  async create(studentId: number, createBookingDto: CreateBookingDto) {
    const booking = new Booking();
    Object.assign(booking, {
      mentor: createBookingDto.mentorId,
      mentee: studentId,
      start_date: createBookingDto.start_date,
      end_time: createBookingDto.end_time,
    });
    const savedBooking = await this.bookingRepository.save(booking);
    return savedBooking;
  }

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
