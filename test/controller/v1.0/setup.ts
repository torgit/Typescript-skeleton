import 'reflect-metadata';
import { userTor } from './models';
import { Connection } from 'typeorm/connection/Connection';
import { UserService } from './../../../src/service/user';
import { UserRepository } from './../../../src/database/repository/user';
import { Application } from 'express';
import { App } from '../../../src/app';
import { createConnection } from 'typeorm';
import * as path from 'path';
const entitiesPath = path.resolve(__dirname, "../../../src/database/entity/**/*");
export const setupConnection = async (): Promise<Connection> => {
    console.log(entitiesPath);
    return await createConnection({
        type: "sqljs",
        entities: [entitiesPath],
        logging: false,
        dropSchema: true,
        synchronize: true
      });
}
export const setupApplication = async (connection: Connection): Promise<Application> => {
    const app = await new App(connection).getApp();
    const userRepository = connection.getCustomRepository(UserRepository);
    new UserService(userRepository);
    userRepository.insert(userTor);
    return app;
}