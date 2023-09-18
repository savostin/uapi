# Backend Hiring Challenge

Create GraphQL API using NestJS to manage users. This API should allow users to be created, edited, and filtered. The goal is to evaluate your ability to design and implement a NestJS application, along with GraphQL schema design and implementation.

## Solution

The API is a NetsJS application written in Typescript and using:

* Apollo Server as GraphQL server
* Prisma as ORM
* Jest (Supertest) for tests
* ESLint
* Faker for initial data seed
* PostgreSQL as database server
* Docker and Docker Compose for dev deployment

## Run the project

* Copy file **.env.example** to **.env**
* Install Docker and Docker Compoe plugin.
* Run ```docker compose up -d``` in the project root dir. Wait copuple of minutes to install, start and seed DB.
* Open http://127.0.0.1:8080/graphql for GraphQL Playgraound UI. Use Docs and Schema tabs for the API documentation.

### Query examples
* List all users:
```
query {
  listUsers(getUsersInput: { return: 50, orderBy: updatedAtDesc }) {
    id
    firstName
    lastName
    email
    status
  }
}
```
* Get one user by ID:
```
query {
  getUser(id: "REPLACE-WITH-A-UUID-FROM-USERS-SEARCH") {
    firstName
    lastName
    email
    status
  }
}
```


* Create a new user:
```
mutation {
  createUser(createUserInput: { 
    firstName: "John",
    lastName: "Doe",
    email: "my@email.com"
    }) {
    id
    status
  }
}
```

* Update user by ID:
```
mutation {
  updateUser(updateUserInput: { 
    id: "REPLACE-WITH-A-UUID-FROM-PREVIOUS-STEP"
    email: "new@email.com"
    }) {
    firstName
    lastName
    email
  }
}
```

### Run tests
Open docker container terminal with 
* Unit tests: ```docker exec -it -w /app uapi.app npm run test```
* E2e tests: ```docker exec -it -w /app uapi.app npm run test:e2e```


### Notes and todos
* Error handler is a default Apollo handler. Should be more specific to the project and well documented.
* No app logger has been implemented
* UsersRepository should be implemented with an interface
* The unit and e2e tests are basic only. There are more to add especially for edge cases.
* There is no production deployment.