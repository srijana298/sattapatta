import { Listings } from '../../listings/entities/listing.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @OneToMany(() => Listings, (listing) => listing.offering_skill)
  offerings: Listings[];

  @OneToMany(() => Listings, (listing) => listing.requested_skill)
  requests: Listings[];
}
