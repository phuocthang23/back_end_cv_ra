import { JobEntity } from 'src/modules/job/entities/job.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('companies')
export class CompanyEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  logo: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  link_fb: string;

  @Column({ nullable: true })
  link_linkedin: string;

  @Column({ nullable: true })
  follower: number;

  @Column({ nullable: false })
  size: number;

  @Column({ nullable: false })
  description: string;



  @Column({
    select: false,
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: string;

  @OneToMany(() => CompanyEntity, (company) => company.jobs)
    jobs: JobEntity[]

  @Column({
    select: false,
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: string;
}
