import { CandidateEntity } from 'src/modules/candidates/entities/candidates.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  role: string;

  @OneToMany(() => CompanyEntity, (company) => company.role)
  companies: CompanyEntity[];

  @OneToMany(() => CandidateEntity, (user) => user.role)
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
