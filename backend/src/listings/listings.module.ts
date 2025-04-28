import { Module } from '@nestjs/common';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listings } from './entities/listing.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([Listings]),
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
