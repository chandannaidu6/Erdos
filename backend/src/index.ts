import { Hono } from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'
import {userRouter} from './routes/user';
import { cors } from 'hono/cors';
import problemRouter from './routes/problem';
import categoryRouter from './routes/category';

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string,
  }
}>()
app.use('/*',cors())
app.route('/api/leetcode',userRouter);
app.route('/api/leetcode/landing',problemRouter)
app.route('/api/admin',categoryRouter)



export default app
