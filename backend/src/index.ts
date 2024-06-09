import { Hono } from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'
import {userRouter} from './routes/user';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string,
  }
}>()
app.use('/*',cors())
app.route('/api/leetcode',userRouter);




export default app
