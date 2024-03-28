import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { CandidateEntity } from 'src/modules/candidates/entities/candidates.entity';

@Entity('introduce_candidates')
export class IntroduceCandidatesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ nullable: true })
  candidatesId: number;

  @ManyToOne(
    () => CandidateEntity,
    (candidates) => candidates.projectCandidates,
  )
  candidates: CandidateEntity[];

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
