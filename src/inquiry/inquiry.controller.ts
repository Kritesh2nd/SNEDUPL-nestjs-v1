import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { InquiryService } from "./inquiry.service";
import { CreateInquiryDto } from "./dto/inquiry.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("inquiries")
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  // Public — anyone can submit
  @Post()
  create(@Body() dto: CreateInquiryDto) {
    return this.inquiryService.create(dto);
  }

  // Protected — admin only
  // @Get()
  // @UseGuards(JwtAuthGuard)
  // findAll() {
  //   return this.inquiryService.findAll();
  // }

  // Protected — admin only
  @Get()
  @UseGuards(JwtAuthGuard)
  async getInquiries(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("search") search?: string,
  ) {
    return this.inquiryService.getInquiries({
      page: Number(page) || 1,
      limit: Number(limit) || 20,
      search: search || "",
    });
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.inquiryService.findById(id);
  }

  @Patch(":id/read")
  @UseGuards(JwtAuthGuard)
  markRead(@Param("id", ParseUUIDPipe) id: string) {
    return this.inquiryService.markRead(id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.inquiryService.remove(id);
  }
}
