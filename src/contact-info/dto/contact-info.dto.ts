import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsUrl,
  ValidateNested,
  IsObject,
} from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";

export class SocialLinksDto {
  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  twitter?: string;
}

export class CreateContactInfoDto {
  @IsString()
  @IsNotEmpty()
  factoryAddress: string;

  @IsString()
  @IsNotEmpty()
  officeAddress: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  socialLinks?: SocialLinksDto;
}

export class UpdateContactInfoDto extends PartialType(CreateContactInfoDto) {}
