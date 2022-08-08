// components/login.tsx

/** @jsx h */
import { h } from "preact"
import { PageProps } from "$fresh/server.ts";
import Base from "../base.tsx"

function LoginJsx(props: PageProps){

  return(
      <section class="Login" >
          <link rel="stylesheet" href="/styles/front/login.css" />
          <div class="wrapper">
              <div class="title">ផ្ទៀងផ្ទាត់​ពាក្យ​សំងាត់​ចូល​គណនី​</div>
              <form action="/login" method="post" >
                  <a>Email:</a><input type="email" name="email" value="guest@khmerweb.app" 
                      required />
                  <a>ពាក្យ​សំងាត់ៈ</a><input type="password" name="password" 
                      value="rdagfyhows"  required />
                  <a></a><input type="submit" value="បញ្ជូន" />
                  <a></a><div class="info">{props.data.setting.message}</div>
              </form>
        </div>
      </section>
  )
}

export default function Login(props: PageProps){
  props.data.page = LoginJsx
  return(
    <Base data={props.data} />
  )
}