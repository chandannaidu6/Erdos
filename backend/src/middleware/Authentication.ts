import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';
import { Context } from 'hono';
import { Next } from 'hono';

async function verifyCookie(c:Context,next:Next){
    const cookie =   getCookie(c,'jwt')
    console.log("Retrieved Cookie:", cookie); // Log the retrieved cookie
    if(!cookie){
        c.status(403);
        return c.json({error:"unauthorized"})
    }
    try{
        const user = await verify(cookie,c.env.JWT_SECRET)
        console.log("Verified User",user)
        if(user && user.id){
            c.set('userId',user.id);
            await next();

        }else{
            c.status(403);
            return c.json({error:"unauthorized"});
        }
    }
    catch(e){
        c.status(403);
        return c.json({message:'You are not logged in'})
    }
}
export default verifyCookie