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
      .then((res) => res.body.data?.listUsers[0]?.id);
  });

  for (const task of [
    {
      limit: 3,
      status: 200,
    },
    {
      limit: 10,
      status: 200,
    },
    {
      limit: 51,
      status: 401,
    },
  ]) {
    it(`listUsers (${task.limit})`, async () => {
      return graphql
        .send({
          query: `{
        listUsers(getUsersInput: { return: ${task.limit}, orderBy: updatedAtDesc }) {
          id
          firstName
          lastName
          email
          status
        }
      }`,
        })
        .expect(task.status)
        .expect((res) => {
          console.log(res);
          const data = res.body.data?.listUsers || [];
          expect(data.length).toBeLessThanOrEqual(task.limit);
          expect(data[0]).toMatchObject(userValidator);
        });
    });
  }

  for (const task of [
    {
      id: testID,
      status: 200,
    },
    {
      id: crypto.randomUUID(),
      status: 404,
    },
  ]) {
    it(`getUser ${task.status}`, async () => {
      return graphql
        .send({
          query: `{
          getUser("${task.id}") {
          id
          firstName
          lastName
          email
          status
        }
      }`,
        })
        .expect(task.status)
        .expect((res) => {
          const data = res.body.data?.listUsers || [];
          expect(data.length).toBe(1);
          expect(data[0]).toMatchObject(userValidator);
        });
    });
  }

  it('createUser', async () => {
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
        const data = res.body.data?.createUser ?? {};
        expect(data).toMatchObject({
          id: expect.toBeValidUUID(),
          ...newUser,
        });
      });
  });

  for (const task of [
    {
      id: testID,
      status: 200,
    },
    {
      id: crypto.randomUUID(),
      status: 404,
    },
  ]) {
    it(`updateUser ${task.status}`, async () => {
      const newUser = {
        id: task.id,
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
        .expect(task.status)
        .expect((res) => {
          const data = res.body.data?.updateUser ?? [];
          expect(data[0]).toMatchObject(newUser);
        });
    });
  }
});
