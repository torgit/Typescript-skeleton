import 'reflect-metadata';
import { User } from './../../../src/database/entity/user';
import { Container } from 'typedi';
import { Application } from 'express';
import { Connection } from 'typeorm/connection/Connection';
import * as request from 'supertest';
import app from '../../../src/app';
import { useContainer, createConnection } from 'typeorm';
import { App } from '../../../src/app';
import { setupApplication, setupConnection } from './setup';

describe('Home Controller', () => {
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
  
  test('GET: / should return API message', async (done) => {
    const response = await request(app)
      .get('/')
      .expect(200);
    expect(response.body.data).toBe('Super Scores TS Application');
    done();
  });
});