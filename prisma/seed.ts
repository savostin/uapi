// prisma/seed.ts

import { PrismaClient, UserStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

// initialize Prisma Client
const prisma = new PrismaClient();

const USERS_COUNT = 10;

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.values(anEnum) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

async function main() {
  // create dummy users
  for (let i = 0; i < USERS_COUNT; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const createdAt = faker.date.past();
    const updatedAt = faker.date.between({ from: createdAt, to: 'now' });
    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: `${firstName}.${lastName}@${faker.internet.domainName()}`,
        status: randomEnum(UserStatus),
        createdAt: createdAt,
        updatedAt: updatedAt,
      },
    });
    console.log(user);
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
