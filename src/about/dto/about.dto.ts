import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAboutDto {
  @IsString()
  @IsNotEmpty()
  aboutSummary: string;

  @IsString()
  @IsNotEmpty()
  brandStory: string;
}

export class UpdateAboutDto extends PartialType(CreateAboutDto) {}
