import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string

  }

}>()

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
    const jwtToken = await sign({id:user.id},c.env.JWT_SECRET)
    setCookie(c,'jwt',jwtToken,{
      httpOnly:true,
      secure:true,
      sameSite:'Strict'
    });
    return c.json({message:"Signup Successfull"})


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
        Username:body.Username
      }
    })
    if(!user){
      c.status(403)
      return c.json({error:"user not found"})
    }

    const jwtToken = await sign({id:user.id},c.env.JWT_SECRET);
    setCookie(c,'jwt',jwtToken,{
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    })
    return c.json({message:"Signin Successful"})




})

export default userRouter
