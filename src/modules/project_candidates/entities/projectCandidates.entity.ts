import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CandidateEntity } from 'src/modules/candidates/entities/candidates.entity';

@Entity('project_candidates')
export class ProjectCandidatesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  candidatesId: number;

  @Column({ type: 'date', nullable: false, name: 'started_at' })
  started_at: Date;

  @Column({ type: 'date', nullable: false, name: 'end_at' })
  end_at: Date;

  @Column()
  info: string;

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
