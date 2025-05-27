import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Req,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from 'src/auth.guard';
import { AuthRequest } from 'src/AuthRequest';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req: AuthRequest,
  ) {
    const studentId = req.user.id;
    const bookingExists = await this.bookingsService.findExistingBooking(
      createBookingDto.mentorId,
      studentId,
      createBookingDto.start_date,
      createBookingDto.end_time,
    );

    if (bookingExists) {
      throw new BadRequestException(
        'Booking already exists for this mentor and time slot. Please choose another time slot',
      );
    }
    return this.bookingsService.create(studentId, createBookingDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Req() request: AuthRequest,
    @Query('hasMentors') hasMentors: boolean = false,
  ) {
    if (hasMentors) {
      return this.bookingsService.findByMentors(request.user.id);
    }
    return this.bookingsService.findAll(request.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
