import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('leadership_profiles')
export class LeadershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column({ type: 'varchar' })
  boardType: 'Board of Directors' | 'Management';

  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @Column({ default: true })
  showOnSite: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
