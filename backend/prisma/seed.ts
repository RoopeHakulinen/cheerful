import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const testUser = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      firstName: 'Test',
      lastName: 'User',
      teams: {
        create: { id: 1, name: 'TestTeam' },
      },
    },
  });

  const testPerson = await prisma.person.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'TestPerson',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
