import { BaseEntity } from 'src/core/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AccessCardRole } from '../enum/accessCard.role';
import { UserEntity } from 'src/modules/system_users/entities/user.entity';
import { PeoplesEntity } from 'src/modules/peoples/entities/peoples.entity';

@Entity({ name: 'access_cards' })
export class AccessCardsEntity extends BaseEntity {
  @Column({ length: 255, unique: true, nullable: false })
  cardNumber: string;

  @Column({
    type: 'enum',
    enum: AccessCardRole,
    default: AccessCardRole.COMMON,
    nullable: false,
  })
  role: AccessCardRole;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  registeredBy: UserEntity;

  @ManyToOne(() => PeoplesEntity, { nullable: false })
  @JoinColumn({ name: 'peopleId' })
  people: PeoplesEntity;
}
