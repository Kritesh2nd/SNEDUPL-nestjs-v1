import { IsString, IsInt, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTimelineDto {
  @IsInt()
  @Min(1800)
  @Max(2100)
  @Type(() => Number)
  year: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateTimelineDto extends PartialType(CreateTimelineDto) {}
