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

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isadmin: boolean;

  @JoinTable()
  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
  })
  reviews: Review[];
}
