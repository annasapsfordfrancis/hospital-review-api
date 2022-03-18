import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { UpdateReviewDto } from 'src/reviews/dto/update-review.dto';
import { ReviewsService } from 'src/reviews/reviews.service';
import { User } from 'src/users/entities/user.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(
    private readonly hospitalsService: HospitalsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Get()
  findAll() {
    return this.hospitalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalsService.findOne(id);
  }

  @Post()
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalsService.create(createHospitalDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHospitalDto: UpdateHospitalDto,
  ) {
    return this.hospitalsService.update(id, updateHospitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalsService.remove(id);
  }

  @Get(':id/reviews')
  async findReviewsByHospital(@Param('id') id: string) {
    const hospital = await this.hospitalsService.findOne(id);
    return await this.reviewsService.findReviewsByHospital(hospital);
  }

  @Post(':id/reviews')
  @UseGuards(AuthGuardJwt)
  async createReview(
    @Param('id') hospitalId: string,
    @CurrentUser() user: User,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const hospital = await this.findOne(hospitalId);
    return await this.reviewsService.createReview(
      createReviewDto,
      user,
      hospital,
    );
  }

  @Get(':hospitalId/reviews/:reviewId')
  findOneReview(@Param('reviewId') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':hospitalId/reviews/:reviewId')
  @UseGuards(AuthGuardJwt)
  updateReview(
    @Param('reviewId') id: string,
    @CurrentUser() user: User,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, updateReviewDto, user);
  }

  @Delete(':hospitalId/reviews/:reviewId')
  @UseGuards(AuthGuardJwt)
  removeReview(@Param('reviewId') id: string, @CurrentUser() user: User) {
    return this.reviewsService.remove(id, user);
  }
}
