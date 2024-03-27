import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import BitTransformer from '../../../shared/utils/bit.transformer';
import { CandidateEntity } from 'src/modules/candidates/entities/candidates.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';

@Entity('jobs')
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date', nullable: false, name: 'expire_at' })
  expire_at: Date;

  @Column()
  salary: number;

  @Column()
  level: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  companyId: string;

  @Column({
    type: 'bit',
    nullable: false,
    name: 'isBlock',
    transformer: new BitTransformer(),
  })
  isBlock: boolean;

  @ManyToMany(() => CandidateEntity, (candidate) => candidate.jobs)
  @JoinTable()
  candidates: CandidateEntity[];

  @ManyToOne(
    () => CompanyEntity,
    (company) => company.jobs,
  )
  company: CompanyEntity[];

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: string;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: string;
}
