import { BaseEntity } from 'src/core/entities';
import { UserEntity } from 'src/modules/system_users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DoorsState } from '../enum/doors.state';

@Entity({ name: 'doors' })
export class DoorsEntity extends BaseEntity {
  @Column({ length: 100, nullable: false, unique: true })
  name: string;

  @Column({ length: 100, nullable: false })
  readerModel: string;

  @Column({ nullable: false })
  isOpen: boolean;

  @Column({ type: "enum", enum: DoorsState, default: DoorsState.OPEN })
  state: DoorsState;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  registeredBy: UserEntity;
}
