import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateHeroDto {
  @IsString()
  @IsNotEmpty()
  tagline: string;

  @IsString()
  @IsNotEmpty()
  subTagline: string;

  @IsString()
  @IsNotEmpty()
  ctaText: string;
}

export class UpdateHeroDto extends PartialType(CreateHeroDto) {}
