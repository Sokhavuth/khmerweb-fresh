// controllers/admin/post.ts

import { getCookies, deleteCookie } from "cookies";
import { setting, secret_key, myredis } from 'setting';
import { verify } from "jwt";
import postdb from "../../models/post.ts";


class Post{
    async getPage(req, ctx){
        const cookies = getCookies(req.headers);

        if((cookies)&&(cookies.session_id)){
            const jwt = await myredis.get(cookies.session_id);
            try{
                const payload = await verify(jwt, secret_key, "HS512");
                if(payload.user){
                    const config = setting();
                    config.page_title = "ទំព័រ​ការផ្សាយ";
                    config.username = payload.user.title;
                    config.count = await postdb.count();
                    config.items = await postdb.getPosts(config.post_amount);
                    
                    return await ctx.render({"setting": config});
                }
            }catch(error){
                console.log(error);
                const config = setting();
                config.page_title = "ទំព័រ​ចុះ​ឈ្មោះ";
                const resp = new Response();
                deleteCookie(resp.headers, "session_id");
                return new Response(undefined, { headers: {location: `/login`}, status: 302 });
            }
        }   

        return new Response(undefined, { headers: {location: `/login`}, status: 302 });
    }

    async createPost(req, ctx){
        const cookies = getCookies(req.headers);
        if((cookies)&&(cookies.session_id)){
            const jwt = await myredis.get(cookies.session_id);
            try{
                const payload = await verify(jwt, secret_key, "HS512");
                if(payload.user.role in {'Admin':1,'Editor':1,'Author':1}){
                    await postdb.insertPost(req, payload.user.id);
                }
                return new Response(undefined, { headers: {location: `/admin/post`}, status: 302 });
            }catch(error){
                console.log(error);
                const resp = new Response(undefined, { headers: {location: `/login`}, status: 302 });
                deleteCookie(resp.headers, "session_id");
                return resp;
            }
        }

        return new Response(undefined, { headers: {location: `/login`}, status: 302 });
    }
}

export default new Post();