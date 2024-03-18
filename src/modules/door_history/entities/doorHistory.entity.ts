import { BaseEntity } from 'src/core/entities';
import { AccessCardsEntity } from 'src/modules/access_cards/entities/accessCards.entity';
import { DoorsEntity } from 'src/modules/doors/entities/doors.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'door_history' })
export class DoorHistoryEntity extends BaseEntity {
  @ManyToOne(() => DoorsEntity, { nullable: false })
  @JoinColumn({ name: 'doorId' })
  door: DoorsEntity;

  @ManyToOne(() => AccessCardsEntity, { nullable: false })
  @JoinColumn({ name: 'accessCardId' })
  accessCard: AccessCardsEntity;
}
