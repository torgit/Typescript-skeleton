import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {SoccerBaseEntity} from './base';

@Entity('User_Users')
export class User extends SoccerBaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  firebaseUid: string;
  @Column()
  email: string;
  @Column()
  displayName: string;
  @Column()
  profilePictureUrl: string;
  @Column()
  profilePictureProvider: string;
  @Column()
  emailVerify: boolean;
}