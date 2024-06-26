import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import BitTransformer from '../../../shared/utils/bit.transformer';
import { JobEntity } from 'src/modules/job/entities/job.entity';
import { ProjectCandidatesEntity } from 'src/modules/project_candidates/entities/projectCandidates.entity';
import { SkillCandidatesEntity } from 'src/modules/skill_candidates/entities/skillCandidates.entity';
import { EducationCandidatesEntity } from 'src/modules/education_candidates/entities/educationCandidates.entity';
import { ExperienceCandidatesEntity } from 'src/modules/experience_candidate/entities/experienceCandidates.entity';
import { CertificateCandidatesEntity } from 'src/modules/certificate_candidate/entities/certificateCandidate.entity';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import { IntroduceCandidatesEntity } from 'src/modules/introduce_candidates/entities/introduceCandidates.entity';

@Entity('candidates')
export class CandidateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
    default:
      'https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png',
  })
  avatar: string;

  @Column({
    type: 'bit',
    nullable: true,
    name: 'isOpen',
    transformer: new BitTransformer(),
  })
  isOpen: boolean;

  @Column({ type: 'date', nullable: false, name: 'dob' })
  dob: Date;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  password: string;

  @Column()
  gender: number;

  @Column({ nullable: true })
  link_fb: string;

  @Column({ nullable: true })
  link_linkedin: number;

  @Column({ nullable: true })
  link_git: number;

  @Column({ nullable: true })
  SkillsCandidateId: number;

  @Column({ nullable: true })
  EducationCandidateId: number;

  @Column({ nullable: true })
  ExperienceCandidateId: number;

  @Column({ nullable: true })
  ProjectCandidateId: number;

  @Column({ nullable: true })
  CertificateCandidateId: number;

  @ManyToMany(() => JobEntity, (job) => job.candidates)
  jobs: JobEntity[];

  @OneToMany(
    () => ProjectCandidatesEntity,
    (projectCandidate) => projectCandidate.candidates,
  )
  projectCandidates: ProjectCandidatesEntity;

  @OneToMany(
    () => SkillCandidatesEntity,
    (skillCandidate) => skillCandidate.candidates,
  )
  skillCandidates: SkillCandidatesEntity;

  @OneToMany(
    () => EducationCandidatesEntity,
    (skillCandidate) => skillCandidate.candidates,
  )
  educationCandidates: EducationCandidatesEntity;

  @ManyToOne(() => RoleEntity, (role) => role.candidates)
  role: RoleEntity;

  @Column({ nullable: true, default: 3 })
  roleId: string;

  @Column({ nullable: true })
  introduceCandidatesId: string;

  @OneToMany(
    () => ExperienceCandidatesEntity,
    (experienceCandidate) => experienceCandidate.candidates,
  )
  experienceCandidates: ExperienceCandidatesEntity;

  @OneToMany(
    () => CertificateCandidatesEntity,
    (certificateCandidate) => certificateCandidate.candidates,
  )
  certificateCandidates: CertificateCandidatesEntity;

  @OneToMany(
    () => IntroduceCandidatesEntity,
    (introduceCandidates) => introduceCandidates.candidates,
  )
  introduceCandidates: IntroduceCandidatesEntity;

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
