import {Container, Service} from 'typedi';

import {UserRepository} from './../database/repository/user';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserService {
  constructor(@OrmRepository() private readonly userRepository: UserRepository) {}
  getAll() {
    return this.userRepository.getAll();
  }
}