import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const submissionRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
    }
}>();
submissionRouter.post('')

