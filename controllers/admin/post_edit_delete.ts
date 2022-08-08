// controllers/admin/post_edit_delete.ts

import { getCookies, deleteCookie } from "cookies";
import { setting, secret_key, myredis } from 'setting';
import { verify } from "jwt";
import postdb from "../../models/post.ts";


class PostEditDelete{
    async editDeletePost(req, ctx){
        const cookies = getCookies(req.headers);
        if((cookies)&&(cookies.session_id)){
            const jwt = await myredis.get(cookies.session_id);
            try{
                const payload = await verify(jwt, secret_key, "HS512")
                if(payload.user){
                    const config = setting();
                    config.page_title = "កែប្រែ​ការផ្សាយ";
                    config.username = payload.user.title;
                    config.count = await postdb.count();
                
                    if(ctx.params.name === 'edit'){
                        config.item = await postdb.getPost(ctx.params.id);
                    }else if(ctx.params.name === 'delete'){
                        const post = await postdb.getPost(ctx.params.id);
                        if((payload.user.role in {'Admin':1})||(payload.user.id === post.userid)){
                            await postdb.deletePost(ctx.params.id);
                        }
                        return new Response(undefined, { headers: {location: `/admin/post`}, status: 302 });
                    }else{
                        console.log('');
                    }
                    
                    config.items = await postdb.getPosts(config.post_amount);

                    return await ctx.render({"setting": config});
                }
            }catch(error){
                console.log(error)
                const resp = new Response(undefined, { headers: {location: `/login`}, status: 302 });
                deleteCookie(resp.headers, "session_id");
                return resp;
            }
        }

        return new Response(undefined, { headers: {location: `/login`}, status: 302 });
    }

    async updatePost(req, ctx){
        const cookies = getCookies(req.headers);
        if((cookies)&&(cookies.session_id)){
            const jwt = await myredis.get(cookies.session_id);
            try{
                const payload = await verify(jwt, secret_key, "HS512");
                const post = await postdb.getPost(ctx.params.id);
                if((post.userid === payload.user.id)||(payload.user.role in {'Admin':1,'Editor':1})){
                    if(ctx.params.name === 'edit'){
                        await postdb.updatePost(req, ctx.params.id);
                    }
                    return new Response(undefined, { headers: {location: `/admin/post`}, status: 302 });
                }
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

export default new PostEditDelete();