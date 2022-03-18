import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './entities/hospital.entity';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  imports: [ReviewsModule, TypeOrmModule.forFeature([Hospital])],
  providers: [HospitalsService],
  controllers: [HospitalsController],
})
export class HospitalsModule {}
