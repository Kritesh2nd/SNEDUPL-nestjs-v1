import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class CreateInquiryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export interface GetInquiriesParams {
  page: number;
  limit: number;
  search: string;
}
