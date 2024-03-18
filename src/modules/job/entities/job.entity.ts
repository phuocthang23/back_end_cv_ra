import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jobs')
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  address: string;


  @Column({ type: 'date', nullable: false, name: 'working_time' })
  working_time: Date;

  @Column({ type: 'date', nullable: false, name: 'application_deadline' })
  application_deadline: Date;

  @Column()
  wage: number;

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
