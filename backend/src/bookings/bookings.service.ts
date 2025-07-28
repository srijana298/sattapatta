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

  findByMentors(mentor_id: number) {
    return this.bookingRepository.find({
      relations: ['mentee', 'mentor', 'mentor.mentor_profile'],
      where: {
        mentor: { id: mentor_id },
      },
      select: {
        mentor: {
          id: true,
          fullname: true,
          email: true,
        },
        mentee: {
          id: true,
          fullname: true,
          email: true,
        },
      },
    });
  }

  findAll(student_id: number) {
    return this.bookingRepository.find({
      relations: ['mentee', 'mentor', 'mentor.mentor_profile'],
      where: {
        mentee: { id: student_id },
      },
      select: {
        mentor: {
          id: true,
          fullname: true,
        },
        mentee: {
          id: true,
          fullname: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.bookingRepository.findOne({
      relations: [
        'mentee',
        'mentor',
        'mentor.mentor_profile',
        'mentor.mentor_profile.user',
        'mentor.mentor_profile.skills',
      ],
      where: {
        id,
      },
      select: {
        mentor: {
          id: true,
          fullname: true,
          mentor_profile: {
            id: true,
            profilePhotoUrl: true,
            hourly_rate: true,
            experience: true,
            introduction: true,
            countryOfBirth: true,
            user: {
              id: true,
              email: true,
              fullname: true,
            },
            skills: {
              id: true,
              name: true,
            },
          },
        },
        mentee: {
          id: true,
          fullname: true,
        },
      },
    });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingRepository.findOne({
      where: {
        id,
      },
    });

    if (!booking) {
      return null;
    }

    const state = {
      date: updateBookingDto.date,
      status: updateBookingDto.status,
    };

    Object.assign(booking, state);
    await booking.save();
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
