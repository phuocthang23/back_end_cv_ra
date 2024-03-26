import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CandidateEntity } from 'src/modules/candidates/entities/candidates.entity';

@Entity('skill_candidates')
export class SkillCandidatesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  level_job_id: string;

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
