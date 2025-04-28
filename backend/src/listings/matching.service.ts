import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listings } from './entities/listing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchingService {
  constructor(
    @InjectRepository(Listings)
    private listingsRepository: Repository<Listings>,
  ) {}

  // Main function
}
