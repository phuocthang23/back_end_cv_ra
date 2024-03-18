import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
export class CompanyEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  companyName: string;

  @Column({ nullable: false })
  website: string;

  @Column({ nullable: false })
  facbookLink: string;

  @Column({ nullable: false })
  Linkeidn: string;

  @Column({ nullable: false })
  Github: string;

  @Column({ nullable: false })
  address: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({ nullable: true })
  policy: string;

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
