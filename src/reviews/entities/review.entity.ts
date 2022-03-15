import { Hospital } from 'src/hospitals/entities/hospital.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  star_rating: number;

  @Column()
  review_text: string;

  @JoinTable()
  @ManyToOne((type) => Hospital, (hospital) => hospital.reviews)
  hospital: Hospital;

  @JoinTable()
  @ManyToOne((type) => User, (user) => user.reviews)
  user: User;
}
