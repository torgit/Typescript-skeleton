import 'reflect-metadata';
import { userTor } from './models';
import { Application } from 'express';
import { App } from './../../../src/app';
import { Container } from 'typedi';
import { UserRepository } from './../../../src/database/repository/user';
import { User } from './../../../src/database/entity/user';
import { UserService } from './../../../src/service/user';
import * as request from 'supertest';
import { Connection } from 'typeorm/connection/Connection';
import { createConnection, useContainer } from 'typeorm';
import { DateHelper } from '../../../src/helper/date';
import { setupApplication, setupConnection } from './setup';

describe('User Controller', () => {
  let connection: Connection;
  let app: Application;

  beforeEach(async () => {
    useContainer(Container);
    connection = await setupConnection();
    app = await setupApplication(connection);
  });
  afterEach(async () => {
    await connection.close();
  });
  
  test('GET: /users should users', async (done) => {
    const response = await request(app)
      .get('/users')
      .expect(200);
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