import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const tags = [
  { id: 1, name: 'Voimaharjoittelu' },
  { id: 2, name: 'Akrobatia' },
  { id: 3, name: 'Nopeus' },
  { id: 4, name: 'Kestävyys' },
  { id: 5, name: 'Henkinen' },
];

export const exercises = [
  { id: 1, name: 'Ponnista', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 3, tags: [tags[0], tags[1]] },
  { id: 2, name: 'Laskeudu', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 3, tags: [tags[3]] },
  { id: 3, name: 'Seiso', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 4, name: 'Kävele', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [tags[2], tags[3]] },
  { id: 5, name: 'Punnerra', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [tags[0], tags[3]] },
  { id: 6, name: 'Kyykkää', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [tags[2], tags[3]] },
  { id: 7, name: 'Lankuta', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [tags[0], tags[3]] },
  { id: 8, name: 'Hölkkää', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [tags[0], tags[3]] },
  { id: 9, name: 'Juokse', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 4, tags: [tags[0], tags[3], tags[2]] },
  { id: 10, name: 'Roiku', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 4, tags: [tags[0], tags[3]] },
  { id: 11, name: 'Hyppää', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [tags[0], tags[1], tags[3]] },
  { id: 12, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 13, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 14, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 15, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 16, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 17, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 18, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 19, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 20, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 21, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] }
];

async function main() {
  await prisma.user.upsert({
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

  await prisma.person.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'TestPerson',
    },
  });

  for(let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    await prisma.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        name: tag.name,
      },
    });
  }

  for(let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];
    await prisma.exercise.upsert({
      where: { id: exercise.id },
      update: {},
      create: {
        name: exercise.name,
        description: exercise.description,
        difficulty: exercise.difficulty,
        tags: { connect: {id: i % tags.length + 1} }
      },
    });
  };
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
