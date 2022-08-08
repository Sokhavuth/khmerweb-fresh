// routes/login.jsx

/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import VLogin from '../components/front/login.tsx';
import CLogin from "../controllers/front/login.ts";


export const handler: Handlers = {
  async GET(req, ctx){
      return await CLogin.getForm(req, ctx);
  },  

  async POST(req, ctx){
      return await CLogin.checkUser(req, ctx);
  },
}


export default function Template(props: PageProps){
    return (
        <VLogin data={props.data} />
    )
}