// routes/logout.tsx

/** @jsx h */
import { h } from "preact";
import { deleteCookie, getCookies } from "cookies";
import { verify } from "jwt";
import { myredis, secret_key } from "setting";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
   async GET(req, ctx) {
        const cookies = getCookies(req.headers);
        if((cookies)&&(cookies.session_id)){
            const jwt = await myredis.get(cookies.session_id);
            try{
              const payload = await verify(jwt, secret_key, "HS512");
              if(payload.user){
                const resp = new Response(undefined, { headers: {location: `/login`}, status: 302 });
                await myredis.del(cookies.session_id);
                deleteCookie(resp.headers, "session_id");
                return resp;
              }
            }catch(error){
              console.log(error);
              return new Response(undefined, { headers: {location: `/login`}, status: 302 });
            }
        }
    },
}

export default function Template(props: PageProps) {
    return (
        <div>Cookie was deleted!</div>
    )
}