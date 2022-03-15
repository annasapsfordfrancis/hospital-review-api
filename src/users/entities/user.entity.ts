import { Review } from 'src/reviews/entities/review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({ default: false })
  isadmin: boolean;

  @JoinTable()
  @OneToMany((type) => Review, (review) => review.user)
  reviews: Review[];
}
