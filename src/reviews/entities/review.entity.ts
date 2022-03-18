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
  @ManyToOne(() => Hospital, (hospital) => hospital.reviews, {
    onDelete: 'CASCADE',
  })
  hospital: Hospital;

  @JoinTable()
  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  user: User;
}
