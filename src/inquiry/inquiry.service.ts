import { Injectable, NotFoundException } from "@nestjs/common";
import { InquiryRepository } from "./inquiry.repository";
import { CreateInquiryDto, GetInquiriesParams } from "./dto/inquiry.dto";
import { ILike } from "typeorm";

@Injectable()
export class InquiryService {
  constructor(private readonly inquiryRepository: InquiryRepository) {}

  findAll() {
    return this.inquiryRepository.findAll();
  }

  async findById(id: string) {
    const inquiry = await this.inquiryRepository.findById(id);
    if (!inquiry) throw new NotFoundException(`Inquiry #${id} not found`);
    return inquiry;
  }

  async getInquiries(params: GetInquiriesParams) {
    const data = await this.inquiryRepository.findBySearchPagination(params);
    return data;
  }

  create(dto: CreateInquiryDto) {
    return this.inquiryRepository.create(dto);
  }

  async markRead(id: string) {
    await this.findById(id);
    return this.inquiryRepository.markRead(id);
  }

  async remove(id: string) {
    await this.findById(id);
    await this.inquiryRepository.remove(id);
    return { message: "Inquiry deleted" };
  }
}
