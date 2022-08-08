// components/base.jsx

/** @jsx h */
import { h } from "preact"
import { PageProps } from "$fresh/server.ts";


export default function Base(props: PageProps){
    const Page = props.data.page
    return(
        <html>
          <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>{props.data.setting.site_title} | {props.data.setting.page_title}</title>
            <link href="/styles/base.css" rel="stylesheet" />
            <link href="/fonts/setup.css" rel="stylesheet" />
            <script src="/scripts/jquery.js"></script>
          </head>
          <body>
            <Page data={props.data} />
          </body>
        </html>
    )
  }