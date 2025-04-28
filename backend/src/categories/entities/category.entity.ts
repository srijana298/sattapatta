import { Listings } from '../../listings/entities/listing.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @OneToMany(() => Listings, (listing) => listing.category)
  listings: Listings[];
}
