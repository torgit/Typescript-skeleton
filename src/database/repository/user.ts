import {Service} from 'typedi';
import {EntityRepository, Repository} from 'typeorm';
import {User} from '../entity/user';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getAll = (): Promise<User[]> => {
    return this.find();
  }
}
