// controllers/front/login.ts

import { setCookie, getCookies, deleteCookie } from "cookies";
import { setting, secret_key, myredis } from 'setting';
import { create, verify, getNumericDate } from "jwt";
import userdb from "../../models/user.ts";
import { bcrypt } from "bcrypt";


class Login{
    async getForm(req, ctx){
        const cookies = getCookies(req.headers);

        if((cookies)&&(cookies.session_id)){
            const jwt = await myredis.get(cookies.session_id);
            try{
                const payload = await verify(jwt, secret_key, "HS512");
                if(payload.user){
                    return new Response(undefined, { headers: {location: `/admin/post`}, status: 302 });
                }
            }catch(error){
                console.log(error);
                const config = setting();
                config.page_title = "ទំព័រ​ចុះ​ឈ្មោះ";
                const resp = new Response();
                deleteCookie(resp.headers, "session_id");
                return await ctx.render({"setting": config});
            }
        }   

        const config = setting();
        config.page_title = "ទំព័រ​ចុះ​ឈ្មោះ";
        return await ctx.render({"setting": config});
    }

    async checkUser(req, ctx){
        const formData = await req.formData();
    
        const user = await userdb.checkUser(formData.get("email"));
        
        if(user){
            if(user.role in {'Admin':1,'Editor':1,'Author':1,"Guest":1}){
                if(await bcrypt.compareSync(formData.get("password"), user.password)){
                    const payload = { 
                        user: user, 
                        exp: getNumericDate(60 * 60 * 24), 
                    };
                    const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, secret_key);
                    const resp = new Response(undefined, { headers: {location: `/admin/post`}, status: 302 });
                    const random_id = crypto.randomUUID();
                    await myredis.set(`${random_id}`, jwt, {ex: 60 * 60 * 24});
                    setCookie(resp.headers, { name: "session_id", value: `${random_id}` });
                    return resp;
                }else{
                    const config = setting();
                    config.page_title = "ទំព័រ​ចុះ​ឈ្មោះ";
                    config.message = "ពាក្យ​សំងាត់​មិន​ត្រឹមត្រូវ​ទេ!";
                    return await ctx.render({"setting": config});
                }
            }else{
                const config = setting();
                config.page_title = "ទំព័រ​ចុះ​ឈ្មោះ";
                config.message = "អ្នក​មិន​ទាន់មាន​ឈ្មោះ​ក្នុង​បញ្ជី​ទេ";
                return await ctx.render({"setting": config});
            }
        }else{
            const config = setting();
            config.page_title = "ទំព័រ​ចុះ​ឈ្មោះ";
            config.message = "Email ​មិន​ត្រឹមត្រូវ​ទេ!";
            return await ctx.render({"setting": config});
        }    
    }
}

export default new Login();