const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function run() {
  const hash = await bcrypt.hash('password123', 10);
  await prisma.user.updateMany({
    where: { email: 'dan@gmail.com' },
    data: { password: hash }
  });
  console.log('Reset password for dan@gmail.com to: password123');
}

run()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
