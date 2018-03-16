import { Container } from 'typedi';
import 'reflect-metadata';
import { UserRepository } from './../../../src/database/repository/user';
import { User } from './../../../src/database/entity/user';
import { UserService } from './../../../src/service/user';
import * as request from 'supertest';
import app from '../../../src/app';
import { Connection } from 'typeorm/connection/Connection';
import { createConnection, useContainer } from 'typeorm';
import { DateHelper } from '../../../src/helper/date';

describe('User Controller', () => {
  let connection: Connection;
  let userService: UserService;
  let userRepository: UserRepository;
  const userTor: User = {
    userId: 1,
    firebaseUid: "1",
    email: "tor@hotmail.com",
    displayName: "tor",
    profilePictureUrl: "",
    profilePictureProvider: "google",
    emailVerify: true,
    createdAt: DateHelper.getCurrentUtcDateTime(),
    updatedAt: DateHelper.getCurrentUtcDateTime()
  };

  beforeEach(async () => {
    useContainer(Container);
    connection = await createConnection({
      type: "sqljs",
      entities: [User],
      logging: false,
      dropSchema: true,
      synchronize: true
    })
    console.log("Connection created!!!!!!!!!!");
    userRepository = connection.getCustomRepository(UserRepository);
    userService = new UserService(userRepository);
    userRepository.insert(userTor);
  });
  afterEach(async () => {
    await connection.close();
  });
  
  test('GET: /users should users', async (done) => {
    const response = await app.then(async app => {
      return request(app)
        .get('/users')
        .expect(200);
    })
    const userResult = response.body.data[0]
    expect(userResult.userId).toBe(userTor.userId);
    expect(userResult.firebaseUid).toBe(userTor.firebaseUid);
    expect(userResult.email).toBe(userTor.email);
    expect(userResult.displayName).toBe(userTor.displayName);
    expect(userResult.profilePictureUrl).toBe(userTor.profilePictureUrl);
    expect(userResult.profilePictureProvider).toBe(userTor.profilePictureProvider);
    expect(userResult.emailVerify).toBe(userTor.emailVerify);
    done();
  });
});