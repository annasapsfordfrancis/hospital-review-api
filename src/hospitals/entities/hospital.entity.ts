import { Review } from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @JoinTable()
  @OneToMany(() => Review, (review) => review.hospital, {
    cascade: true,
  })
  reviews: Review[];
}
