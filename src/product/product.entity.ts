import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../common/types';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  category: ProductCategory;

  @Column()
  tagline: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float', nullable: true })
  alcoholPercent: number | null;

  @Column()
  origin: string;

  @Column({ type: 'jsonb', default: '[]' })
  tasteNotes: { label: string }[];

  @Column({ default: '' })
  image: string;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: false })
  isUpcoming: boolean;

  @Column({ type: 'text', array: true, default: '{}' })
  variants: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
