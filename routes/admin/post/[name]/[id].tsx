// routes/admin/post/[name]/[id].tsx

/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import VPost from '../../../../components/admin/post.tsx';
import CPost from "../../../../controllers/admin/post_edit_delete.ts";


export const handler: Handlers = {
    async GET(req, ctx){
        return await CPost.editDeletePost(req, ctx);
    },


    async POST(req, ctx) {
        return await CPost.updatePost(req, ctx);
    },
}


export default function Template(props: PageProps) {
    return (
        <VPost data={props.data} />
    )
}