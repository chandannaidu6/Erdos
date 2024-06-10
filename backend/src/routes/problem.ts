import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import verifyCookie from '../middleware/Authentication'

export const problemRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
    }
}>
problemRouter.use('/*',verifyCookie);
problemRouter.post('/admin/create',async (c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const body  = await c.req.json()

      try{
        const categories = await prisma.category.findMany({
            where:{
                id:{
                    in:body.categories
                }
            }
        })
        if(categories.length!==body.categories.length){
            return c.json({error:'One or more categories not found'},400)
        }
        const problem = await prisma.problem.create({
            data:{
                title:body.title,
                description:body.description,
                difficulty:body.difficulty,
                problemCategories:{
                    create:body.categories.map((categoryId:string) => ({
                        category:{
                            connect:{id:categoryId}
                        }
                    }))

                }
            }
        })
        return c.json({message:"Problems created Successfully",problem})
      }
      catch(e){
        console.error(e)
        return c.json({error:"Problem creation failed"},500)
      }
})
problemRouter.get('/list',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      try{
        const problems = await prisma.problem.findMany({
            include:{
                problemCategories:{
                    include:{
                        category:true
                    }
                }

            }

        })
        return c.json(problems)

      }
      catch(e){
        console.error(e);
        return c.json({error:"Failed to fetch Problems"},500)

      }

})
problemRouter.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const {id} = c.req.param()
    try{
        const problem = await prisma.problem.findUnique({
            where:{id},
            include:{
                problemCategories:{
                    include:{
                        category:true
                    }
                }
            }
        })
        if(problem){
            return c.json(problem)
        }
        else{
            return c.json({error:"problem not found"},404)
        }

    }
    catch(e){
        console.error(e)
        return c.json({error:"Failed to fetch problem"},500)
    }


})
export default problemRouter
