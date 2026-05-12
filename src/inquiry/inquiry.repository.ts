import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { InquiryEntity } from "./inquiry.entity";
import { GetInquiriesParams } from "./dto/inquiry.dto";
import { ResponseDto } from "@/common/types";

@Injectable()
export class InquiryRepository {
  constructor(
    @InjectRepository(InquiryEntity)
    private readonly repo: Repository<InquiryEntity>,
  ) {}

  findAll(): Promise<InquiryEntity[]> {
    return this.repo.find({ order: { createdAt: "DESC" } });
  }

  findById(id: string): Promise<InquiryEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findBySearchPagination(
    params: GetInquiriesParams,
  ): Promise<ResponseDto<InquiryEntity>> {
    const page = Math.max(params.page, 1);
    const limit = Math.min(Math.max(params.limit, 1), 100);
    const skip = (page - 1) * limit;
    const where = params.search
      ? [
          { name: ILike(`%${params.search}%`) },
          { email: ILike(`%${params.search}%`) },
          { subject: ILike(`%${params.search}%`) },
          { message: ILike(`%${params.search}%`) },
        ]
      : {};

    const [data, totalItems] = await this.repo.findAndCount({
      where,
      order: {
        createdAt: "DESC",
      },
      skip,
      take: limit,
    });

    const totalPages = await this.repo.count();

    return {
      data,
      metadata: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    };
  }

  create(data: Partial<InquiryEntity>): Promise<InquiryEntity> {
    return this.repo.save(this.repo.create(data));
  }

  async markRead(id: string): Promise<InquiryEntity> {
    await this.repo.update(id, { read: true });
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
