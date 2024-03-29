import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import BitTransformer from '../../../shared/utils/bit.transformer';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

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

  @ManyToOne(() => RoleEntity, (role) => role.user)
  role: RoleEntity;

  @OneToMany(() => CompanyEntity, (company) => company.user)
  companies: CompanyEntity[];

  @Column({ nullable: true })
  roleId: string;

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
