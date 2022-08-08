// islands/CkeditorTsx.tsx

/** @jsx h */
import { h } from "preact";
import { useEffect } from "preact/hooks";


export default function CkeditorTsx(){
    function loadJS(FILE_URL: string, async = true) {
        const scriptEle = document.createElement("script");
      
        scriptEle.setAttribute("src", FILE_URL);
        scriptEle.setAttribute("type", "text/javascript");
        scriptEle.setAttribute("async", async);
      
        document.body.appendChild(scriptEle);
      
        scriptEle.addEventListener("load", () => {
          console.log("File loaded")
        });

        scriptEle.addEventListener("error", (ev) => {
          console.log("Error on loading file", ev);
        });
      }

      useEffect(() => {
        loadJS('/scripts/ckeditor/config.js');
      });

    return(
        <section>
            <script src="/scripts/ckeditor/ckeditor.js"></script>
            <textarea id="editor" name="content"></textarea>
        </section>
    )
}