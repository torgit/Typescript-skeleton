import {Container, Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions';

import {UserRepository} from './../database/repository/user';

@Service()
export class UserService {
  constructor(@OrmRepository() private readonly userRepository:
                  UserRepository) {}
  getAll() {
    return this.userRepository.getAll();
  }
}