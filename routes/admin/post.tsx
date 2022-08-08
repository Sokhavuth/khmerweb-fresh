// routes/admin/post.jsx

/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import VPost from '../../components/admin/post.tsx';
import CPost from "../../controllers/admin/post.ts";


export const handler: Handlers = {
  async GET(req, ctx){
      return await CPost.getPage(req, ctx);
  },  

  async POST(req, ctx){
      return await CPost.createPost(req, ctx);
  },
}


export default function Template(props: PageProps){
    return (
        <VPost data={ props.data } />
    )
}