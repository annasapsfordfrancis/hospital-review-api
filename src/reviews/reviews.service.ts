import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  create(createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.preload({
      id: +id,
      ...updateReviewDto,
    });
    if (!review) {
      throw new NotFoundException(`Review #${id} not found.`);
    }
    return this.reviewRepository.save(review);
  }

  async remove(id: string) {
    const review = await this.findOne(id);
    return this.reviewRepository.remove(review);
  }
}
