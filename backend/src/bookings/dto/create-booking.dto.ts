import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  mentorId: number;

  @IsNotEmpty()
  start_date: string;

  @IsNotEmpty()
  end_time: string;
}
