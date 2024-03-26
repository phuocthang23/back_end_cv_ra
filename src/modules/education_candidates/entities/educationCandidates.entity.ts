import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CandidateEntity } from 'src/modules/candidates/entities/candidates.entity';

@Entity('education_candidates')
export class EducationCandidatesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  major: string;

  @Column()
  info: string;

  @Column({ type: 'date', nullable: false, name: 'started_at' })
  started_at: Date;

  @Column({ type: 'date', nullable: false, name: 'end_at' })
  end_at: Date;

  @Column({ nullable: true })
  candidatesId: number;

  @ManyToOne(
    () => CandidateEntity,
    (candidates) => candidates.educationCandidates,
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
