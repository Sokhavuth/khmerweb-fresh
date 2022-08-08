// components/front/home.tsx
 
/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import Base from "../base.tsx";
 
function HomeJsx(props: PageProps){
    return(
        <div>{props.data.message}</div>
    )
}
  
 
export default function Home(props: PageProps){
    props.data.page = HomeJsx;
    return(
        <Base data={props.data} />
    )
}