import "dotenv/config";

import prisma from "../src/lib/prisma";

const categories = [
  { name: "Audio", slug: "audio", description: "Headphones, earbuds, and speakers" },
  { name: "Wearables", slug: "wearables", description: "Smartwatches and fitness gear" },
  { name: "Accessories", slug: "accessories", description: "Cables, cases, and more" },
] as const;

async function seedCategories() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
      },
      create: category,
    });
    console.log(`Category ready: ${category.slug}`);
  }
}

seedCategories()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
