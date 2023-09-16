import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import './uuid.validator';

const gql = '/graphql';
let graphql;
let testID = '';

const userValidator = {
  id: expect.toBeValidUUID(),
  email: expect.stringMatching(/^[A-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Z0-9.-]+$/i),
  firstName: expect.stringMatching(/^[a-zA-Z\-]+$/),
  lastName: expect.stringMatching(/^[a-zA-Z\-]+$/),
  status: expect.stringMatching(/^[A-Z]+$/),
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    graphql = request(app.getHttpServer()).post(gql);

    testID = await graphql
      .send({
        query: `{
      listUsers(getUsersInput: { return: 1, orderBy: updatedAtDesc }) {
        id
      }
    }`,
      })
      .then((res) => res.body.data.listUsers[0]?.id);
    console.log(testID);
  });

  it('listUsers', () => {
    const limit = 3;
    return graphql
      .send({
        query: `{
        listUsers(getUsersInput: { return: ${limit}, orderBy: updatedAtDesc }) {
          id
          firstName
          lastName
          email
          status
        }
      }`,
      })
      .expect(200)
      .expect((res) => {
        console.log(res);
        const data = res.body.data.listUsers;
        expect(data.length).toBeLessThanOrEqual(limit);
        expect(data[0]).toMatchObject(userValidator);
      });
  });

  it('getUser', () => {
    return graphql
      .send({
        query: `{
          getUser("${testID}") {
          id
          firstName
          lastName
          email
          status
        }
      }`,
      })
      .expect(200)
      .expect((res) => {
        const data = res.body.data.listUsers;
        expect(data.length).toBe(1);
        expect(data[0]).toMatchObject(userValidator);
      });
  });

  it('createUser', () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: '${Date.now}@main.com',
    };
    return graphql
      .send({
        query: `{
          createUser(createUserInput: ${JSON.stringify(newUser)}) {
          id
          firstName
          lastName
          email
          status
        }
      }`,
      })
      .expect(200)
      .expect((res) => {
        console.log(res);
        const data = res.body.data.createUser;
        expect(data).toMatchObject({
          id: expect.toBeValidUUID(),
          ...newUser,
        });
      });
  });

  it('updateUser', () => {
    const newUser = {
      id: testID,
      firstName: 'John',
      lastName: 'Doe',
      email: '${Date.now}@main.com',
    };
    return graphql
      .send({
        query: `{
          updateUser(updateUserInput: ${JSON.stringify(newUser)}) {
          id
          firstName
          lastName
          email
          status
        }
      }`,
      })
      .expect(200)
      .expect((res) => {
        const data = res.body.data.updateUser;
        expect(data[0]).toMatchObject(newUser);
      });
  });
});
