import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from "class-validator";
import { Type, Transform } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";
import { ProductCategory } from "../../common/types";

const CATEGORIES: ProductCategory[] = [
  "SOJU",
  "WHISKY",
  "VODKA",
  "HERO_SERIES",
  "OTHER_DISTILLED",
  "NON_ALCOHOLIC",
  "UPCOMING",
];

export class TasteNoteDto {
  @IsString()
  @IsNotEmpty()
  label: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CATEGORIES)
  category: ProductCategory;

  @IsString()
  @IsNotEmpty()
  tagline: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === "" || value === null ? null : Number(value),
  )
  alcoholPercent: number | null;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TasteNoteDto)
  @Transform(({ value }) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value || [];
  })
  tasteNotes: TasteNoteDto[];

  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  featured: boolean;

  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  isUpcoming: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value || [];
  })
  variants?: string[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
