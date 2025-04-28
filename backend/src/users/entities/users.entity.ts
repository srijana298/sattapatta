import { Listings } from '../../listings/entities/listing.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Listings, (listing) => listing.user, {
    onDelete: 'CASCADE',
  })
  listings: Listings[];

  @OneToMany(() => Users, (user) => user.participatedConversations)
  participatedConversations: Users[];
}

export type User = Omit<Users, 'password'>;
