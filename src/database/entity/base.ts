import {CreateDateColumn, UpdateDateColumn} from 'typeorm';

export abstract class SoccerBaseEntity {
  @CreateDateColumn({name: 'createdAt', nullable: false})
  createdAt: Date;
  @UpdateDateColumn({name: 'updatedAt', nullable: true})
  updatedAt: Date;
}