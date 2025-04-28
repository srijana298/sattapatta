import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { Listings } from './entities/listing.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { AuthRequest } from 'src/AuthRequest';
import { AuthGuard } from 'src/auth.guard';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query('me') user: string,
    @Request() req: AuthRequest,
    @Query('query') search: string,
  ): Promise<Listings[]> {
    if (user !== undefined) {
      return await this.listingsService.findByUser(req.user.sub);
    }

    if (search !== undefined) {
      return await this.listingsService.search(search);
    }

    return await this.listingsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req: AuthRequest,
    @Body() createListingDto: CreateListingDto,
  ): Promise<Listings> {
    return await this.listingsService.create(req.user.sub, createListingDto);
  }

  @UseGuards(AuthGuard)
  @Get('/matches')
  async findMatches(
    @Request() req: AuthRequest,
  ): Promise<{ listingA: Listings; listingB: Listings }[]> {
    return await this.listingsService.findMatches(req.user.sub);
  }

  @Get('/popular-data')
  async getPopularCategories(): Promise<{
    popularCategories: {
      name: string;
    }[];
    popularSkills: {
      name: string;
    }[];
  }> {
    const popularCategories = await this.listingsService.getPopularCategories();
    const popularSkills =
      await this.listingsService.getPopularRequestedSkills();
    return {
      popularCategories,
      popularSkills,
    };
  }
}
