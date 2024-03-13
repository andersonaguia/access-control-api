import { BaseEntity } from 'src/core/entities';
import { SourcesEntity } from 'src/modules/sources/entities/sources.entity';
import { UserEntity } from 'src/modules/system_users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'peoples' })
export class PeoplesEntity extends BaseEntity {
  @Column({ length: 255, nullable: false })
  fullName: string;

  @Column({ length: 255, unique: true, nullable: true })
  email: string;

  @Column({ length: 30, unique: true, nullable: true })
  phoneNumber: string;

  @ManyToOne(() => SourcesEntity, { nullable: false })
  @JoinColumn({ name: 'sourceId' })
  sourceId: SourcesEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  registeredBy: UserEntity;
}
