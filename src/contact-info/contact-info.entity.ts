import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("contact_info")
export class ContactInfoEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  factoryAddress: string;

  @Column({ type: "text" })
  officeAddress: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: "text", nullable: true, default: null })
  mapEmbedUrl: string;

  @Column({ type: "jsonb", default: "{}" })
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
