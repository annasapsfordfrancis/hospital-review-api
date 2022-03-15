import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  readonly star_rating: number;

  @IsString()
  readonly review_text: string;
}
