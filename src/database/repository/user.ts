import {Service} from 'typedi';
import {EntityRepository, Repository} from 'typeorm';
import {OrmRepository} from 'typeorm-typedi-extensions';

import {User} from '../entity/user';

@Service() @EntityRepository(User)
export class UserRepository extends Repository<User> {
  getAll = (): Promise<User[]> => {
    return this.find();
  }
}
