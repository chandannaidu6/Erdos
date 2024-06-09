import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const categoryRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

categoryRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
  const body = await c.req.json();

  try {
    await prisma.category.createMany({
      data: body.categories.map((categoryName: string) => ({ name: categoryName })),
    });

    return c.json({ message: 'Categories created successfully' });
  } catch (error) {
    console.error('Error creating categories:', error);
    return c.json({ error: 'Category creation failed' }, 500);
  }
});

export default categoryRouter;
