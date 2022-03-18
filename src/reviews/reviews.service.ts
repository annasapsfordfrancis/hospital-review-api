import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospital } from 'src/hospitals/entities/hospital.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  findAll() {
    return this.reviewRepository.find({ relations: ['user', 'hospital'] });
  }

  async findOne(id: string) {
    const review = await this.reviewRepository.findOne(id, {
      relations: ['user', 'hospital'],
    });
    if (!review) {
      throw new NotFoundException(`Review #${id} not found.`);
    }
    return review;
  }

  public async findReviewsByHospital(hospital) {
    return await this.reviewRepository.find({
      where: { hospital: hospital },
    });
  }

  public async createReview(
    createReviewDto: CreateReviewDto,
    user: User,
    hospital: Hospital,
  ): Promise<Review> {
    return await this.reviewRepository.save({
      ...createReviewDto,
      user,
      hospital,
    });
  }

  public async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
    user: User,
  ) {
    const review = await this.findOne(id);
    if (!review) {
      throw new NotFoundException(`Review #${id} not found.`);
    }
    if (review.user.id !== user.id && user.isadmin === false) {
      throw new ForbiddenException(
        "You don't have permission to edit this review.",
      );
    }
    return await this.reviewRepository.save({
      ...review,
      ...updateReviewDto,
    });
  }

  async remove(id: string, user: User) {
    const review = await this.findOne(id);
    if (review.user.id !== user.id && user.isadmin === false) {
      throw new ForbiddenException(
        "You don't have permission to delete this review.",
      );
    }
    return this.reviewRepository.remove(review);
  }
}
