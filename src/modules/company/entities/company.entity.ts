import { UserEntity } from 'src/modules/auth/entities/auth.entity';
import { JobEntity } from 'src/modules/job/entities/job.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
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

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => UserEntity, (company) => company.companies)
  user: UserEntity;

  @OneToMany(() => JobEntity, (company) => company.company)
  jobs: JobEntity[];

  @Column({ nullable: true })
  userId: string;

  @Column({
    select: false,
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: string;

  @Column({
    select: false,
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: string;
}
