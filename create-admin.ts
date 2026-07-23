import "dotenv/config";

import prisma from "./src/lib/prisma";
import { hashPassword } from "./src/lib/password";

const ADMIN_EMAIL = "test@admin.com";
const ADMIN_PASSWORD = "test@admin";

async function createAdmin() {
  const passwordHash = await hashPassword(ADMIN_PASSWORD);
  const existing = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existing) {
    const admin = await prisma.user.update({
      where: { email: ADMIN_EMAIL },
      data: {
        password: passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`Admin updated: ${admin.email} (${admin.id})`);
    return;
  }

  const admin = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: passwordHash,
        role: "ADMIN",
        name: "Admin",
      },
    });
    await tx.cart.create({
      data: { userId: user.id },
    });
    return user;
  });

  console.log(`Admin created: ${admin.email} (${admin.id})`);
}

createAdmin()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
