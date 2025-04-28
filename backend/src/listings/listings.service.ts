import { Injectable } from '@nestjs/common';
import { ILike, Like, Repository } from 'typeorm';
import { Listings } from './entities/listing.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listings)
    private readonly listingsRepository: Repository<Listings>,
  ) {}

  findAll(): Promise<Listings[]> {
    return this.listingsRepository.find({
      relations: ['offering_skill', 'requested_skill', 'user', 'category'],
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        location: true,
        created_at: true,
        updated_at: true,
        offering_skill: {
          id: true,
          name: true,
        },
        requested_skill: {
          id: true,
          name: true,
        },
        user: {
          id: true,
          email: true,
          fullname: true,
        },
        category: {
          id: true,
          name: true,
        },
      },
    });
  }

  findByUser(userId: number): Promise<Listings[]> {
    return this.listingsRepository.find({
      where: { user: { id: userId } },
      relations: ['offering_skill', 'requested_skill', 'user', 'category'],
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        location: true,
        created_at: true,
        updated_at: true,
        offering_skill: {
          id: true,
          name: true,
        },
        requested_skill: {
          id: true,
          name: true,
        },
        user: {
          id: true,
          email: true,
          fullname: true,
        },
        category: {
          id: true,
          name: true,
        },
      },
    });
  }

  search(query: string): Promise<Listings[]> {
    return this.listingsRepository.find({
      relations: ['user', 'offering_skill', 'category', 'requested_skill'],
      where: [
        {
          title: Like(`%${query}%`),
        },
        {
          description: Like(`%${query}%`),
        },
      ],
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        location: true,
        created_at: true,
        updated_at: true,
        offering_skill: {
          id: true,
          name: true,
        },
        requested_skill: {
          id: true,
          name: true,
        },
        user: {
          id: true,
          email: true,
          fullname: true,
        },
        category: {
          id: true,
          name: true,
        },
      },
    });
  }

  create(
    userId: number,
    createListingDto: CreateListingDto,
  ): Promise<Listings> {
    const listing = new Listings();
    Object.assign(listing, createListingDto);
    return this.listingsRepository.save(listing);
  }

  async getPopularRequestedSkills(
    limit: number = 5,
  ): Promise<{ name: string; userCount: number }[]> {
    const popularSkills: { name: string; userCount: number }[] =
      await this.listingsRepository
        .createQueryBuilder('listing')
        .select('skill.name', 'name')
        .addSelect('COUNT(DISTINCT listing.userId)', 'userCount')
        .innerJoin('listing.requested_skill', 'skill')
        .groupBy('skill.id')
        .orderBy('userCount', 'DESC')
        .limit(limit)
        .getRawMany();

    return popularSkills;
  }

  /**
   * Get popular categories
   * @param limit Number of categories to return
   * @returns Array of popular category names
   */
  async getPopularCategories(limit: number = 5): Promise<{ name: string }[]> {
    // Query to find most used categories in listings
    const popularCategories: { name: string }[] = await this.listingsRepository
      .createQueryBuilder('listing')
      .select('category.name', 'name')
      .innerJoin('listing.category', 'category')
      .groupBy('category.id')
      .orderBy('COUNT(listing.id)', 'DESC')
      .limit(limit)
      .getRawMany();

    return popularCategories;
  }
  async findMatches(
    currentUserId: number,
  ): Promise<{ listingA: Listings; listingB: Listings }[]> {
    // Step 1: Load all active listings related to the current user
    const listings = await this.listingsRepository.find({
      relations: ['offering_skill', 'requested_skill', 'user'],
    });

    // Step 2: Build the adjacency list (graph)
    const graph: Map<number, number[]> = new Map();
    for (const listingA of listings) {
      for (const listingB of listings) {
        if (listingA.id === listingB.id) continue; // skip self

        const offersMatchesRequest =
          listingA.offering_skill.id === listingB.requested_skill.id;
        const requestMatchesOffer =
          listingA.requested_skill.id === listingB.offering_skill.id;

        if (offersMatchesRequest && requestMatchesOffer) {
          if (!graph.has(listingA.id)) graph.set(listingA.id, []);
          graph.get(listingA.id)!.push(listingB.id);
        }
      }
    }

    // Step 3: Prepare structures for matching
    const matchR: Map<number, number> = new Map(); // listingB.id -> listingA.id mapping

    // Step 4: DFS helper
    const bpm = (u: number, seen: Set<number>): boolean => {
      const neighbors = graph.get(u) || [];
      for (const v of neighbors) {
        if (!seen.has(v)) {
          seen.add(v);

          if (!matchR.has(v) || bpm(matchR.get(v)!, seen)) {
            matchR.set(v, u);
            return true;
          }
        }
      }
      return false;
    };

    // Step 5: Run matching
    for (const listing of listings) {
      const seen = new Set<number>();
      bpm(listing.id, seen);
    }

    // Step 6: Build the matched pairs
    const matchedPairs: { listingA: Listings; listingB: Listings }[] = [];
    for (const [v, u] of matchR.entries()) {
      const listingA = listings.find((l) => l.id === u)!;
      const listingB = listings.find((l) => l.id === v)!;
      matchedPairs.push({ listingA, listingB });
    }

    return matchedPairs;
  }
}
