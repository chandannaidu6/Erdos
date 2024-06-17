import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
export const submissionRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
    }
}>();
submissionRouter.post('/create',async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const body = await c.req.json();
      try{
        const submission = await prisma.submission.create({
            data:{
                code:body.code,
                language:body.language,
                status:body.status,
                user:{
                    connect:{id:body.userId}
                },
                problem:{
                    connect:{id:body.problemId}
                },

            }
        })
        return c.json({message:"SUbmission created successfully",submission})

      }
      catch(e){
            console.error(e);
            return c.json({error:"Submission creation failed"},500)
      }

})
submissionRouter.get('/list',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      try{
        const submissions = await prisma.submission.findMany({
            include:{
                user:true,
                problem:true
            }
        })
        return c.json(submissions)
      }
      catch(e){
        console.error(e)
        return c.json({error:"Failed to fetch the submission"},500)
      }

})
submissionRouter.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const {id} =  c.req.param()

      try{
        const submission = await prisma.submission.findUnique({
            where:{id},
            include:{
                user:true,
                problem:true
            }
        })
        if(submission){
            return c.json(submission);

        }
        else{
            return c.json({error:"Failed to fetch submission"},500)
        }
      }
      catch(e){
        console.error(e)
        return c.json({error:"Failed to fetch the submission"},500)
      }

})

