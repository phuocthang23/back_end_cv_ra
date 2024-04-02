import { JobEntity } from 'src/modules/job/entities/job.entity';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import BitTransformer from 'src/shared/utils/bit.transformer';
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

  @Column({
    nullable: false,
    default:
      'https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png',
  })
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

  @OneToMany(() => JobEntity, (company) => company.company)
  jobs: JobEntity[];

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'bit',
    nullable: false,
    name: 'is_block',
    transformer: new BitTransformer(),
  })
  isBlock: boolean;

  @Column()
  card_id: string;

  @ManyToOne(() => RoleEntity, (role) => role.companies)
  role: RoleEntity;

  @Column({ nullable: true, default: 1 })
  roleId: string;

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
