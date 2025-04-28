import { IsNotEmpty } from 'class-validator';

export class CreateListingDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  offering_skill: number;

  @IsNotEmpty()
  requested_skill: number;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  category: number;
}
