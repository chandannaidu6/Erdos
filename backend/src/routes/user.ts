import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { Context,Next } from 'hono'
export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string,
    NODE_ENV:string

  }

}>()

/*userRouter.use('*',async  (c:Context, next:Next) => {
  const isProduction = c.env.NODE_ENV === 'production';
  const allowedOrigin = isProduction ? 'https://your-production-domain.com' : 'http://localhost:5173';

  c.header('Access-Control-Allow-Origin', allowedOrigin);
  c.header('Access-Control-Allow-Credentials', 'true');
  c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (c.req.method === 'OPTIONS') {
    return c.json({message:"null"})
  }

  await  next();
});*/
userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try{
    const user = await prisma.user.create({
      data:{
        Username:body.Username,
        Password:body.Password,
        Confirm:body.Confirm,
        Email:body.Email
      }
    });
    const jwt = await sign({id:user.id},c.env.JWT_SECRET)

    return c.json({jwt})


  }
  catch(e){
     c.text("Signup Unsuccessful");
     return c.status(500)
  }

})
userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where:{
        Email:body.Email,
        Password:body.Password
      }
    })
    if(!user){
      c.status(403)
      return c.json({error:"user not found"})
    }

    const jwt = await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({jwt})




})

export default userRouter
