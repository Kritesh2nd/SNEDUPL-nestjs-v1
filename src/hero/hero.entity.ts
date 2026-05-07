import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hero_content')
export class HeroEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tagline: string;

  @Column()
  subTagline: string;

  @Column()
  ctaText: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
