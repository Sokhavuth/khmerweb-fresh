	// routes/index.tsx
 
/** @jsx h */
import { h } from "preact";
import { setting } from 'setting';
import { Handlers, PageProps } from "$fresh/server.ts";
import Home from '../components/front/home.tsx';
 
 
export const handler: Handlers = {
  async GET(req, ctx) {
    const message = "Welcome to Khmer Web Fresh framework!!";
    return await ctx.render({"message":message,"setting":setting()});
  },
}
 
 
export default function Template(props: PageProps){
  return (
    <Home data={props.data} />
  )
}