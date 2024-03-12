import { BaseEntity } from 'src/core/entities';
import { UserEntity } from 'src/modules/system_users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'sources' })
export class SourcesEntity extends BaseEntity {
  @Column({ length: 255, nullable: false, unique: true })
  name: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  registeredBy: UserEntity;
}
