import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

const BOARD_TYPES = ['Board of Directors', 'Management'] as const;

export class CreateLeadershipDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsEnum(BOARD_TYPES)
  boardType: 'Board of Directors' | 'Management';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  showOnSite?: boolean;
}

export class UpdateLeadershipDto extends PartialType(CreateLeadershipDto) {}
