import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: '.....',
      email: 'user@ex.com',
      password: 'password123',
      balance: 100,
    },
  });

  const products = [
    {
      id: 5,
      name: 'Produto 5 Atualizado',
      description: 'Descrição do Produto 5 Atualizada',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
      userId: user.id,
    },
    {
      id: 6,
      name: 'Produto 6 Atualizado',
      description: 'Descrição do Produto 6 Atualizada',
      price: 9.99,
      image: 'https://via.placeholder.com/100',
      userId: user.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      },
      create: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        userId: product.userId,
      },
    });
  }
}

main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
