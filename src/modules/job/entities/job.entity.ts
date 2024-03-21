import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
