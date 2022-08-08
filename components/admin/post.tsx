// components/admin/post.tsx

/** @jsx h */
import { h } from "preact"
import { PageProps } from "$fresh/server.ts";
import Index from "./index.tsx";


function PostTsx(props: PageProps){
  const item = props.data.setting.item;
  let editor = ``
  let videos = ``

  if(item){
      editor = `
          <form action="/admin/post/edit/${item.id}" name="form" method="post" 
          onSubmit="submitForm(event)">
            <input type="text" name="title" value="${item.title}" required 
            placeholder="ចំណង​ជើង" />
            <textarea id="editor" name="content" >${item.content}</textarea>
            <input type="text" name="categories" value="${item.categories.toString()}" required 
            placeholder="បណ្តា​ជំពូក" />
            <div class="wrapper"> 
                <select id="category" onChange="getCategory()">
                  <option>ជ្រើសរើស​ជំពូក</option>
                  <option>News</option>
                  <option>Movie</option>
                  <option>Entertainment</option>
                  <option>Sport</option>
                </select>
                <input type="text" name="thumb" value="${item.thumb}" required 
                placeholder="តំណរ​ភ្ជាប់​រូប​តំណាង" />
                <input type="datetime-local" value="${item.date}" name="datetime" required />
                <input type="submit" value="បញ្ជូន" />
                <input type="hidden" name="videos" value='${item.videos}' />
            </div>
          </form>
      `
      videos = `
      let is_video = null
      is_video = JSON.parse('${item.videos}')
  
      if((is_video !== '') && (is_video !== '[]')){
        let html = ''
        let episode = is_video.length
      
        for(let video of is_video){
            html += "<div>"
            html += '<input value="'+video.type+'" required />'
            html += '<input value="'+video.id+'" required />'
            html += '<input value="'+video.status+'" required />'
            html += '<p title="Delete" onClick="deleteRow(event)" class="episode">'+(episode--)+'</p>'
            html += "</div>"
        }
  
        if($('.viddata div').html() === ''){
          $('.viddata div').append('<b>ប្រភេទ​</b>')
          $('.viddata div').append('<b>អត្តសញ្ញាណ​</b>')
          $('.viddata div').append('<b>ស្ថានភាព</b>')
          $('.viddata div').append('<b>ភាគ/លុប</b>')
        }
      
        $('.viddata div:eq(0)' ).after(html)
      }
      `
  }else{
      editor = `
          <form action="/admin/post" name="form" method="post" onSubmit="submitForm(event)">
            <input type="text" name="title" required placeholder="ចំណង​ជើង" />
            <textarea id="editor" name="content"></textarea>
            <input type="text" name="categories" required placeholder="បណ្តា​ជំពូក" />
            <div class="wrapper"> 
                <select id="category" onChange="getCategory()">
                  <option>ជ្រើសរើស​ជំពូក</option>
                  <option>News</option>
                  <option>Movie</option>
                  <option>Entertainment</option>
                  <option>Sport</option>
                </select>
                <input type="text" name="thumb" required placeholder="តំណរ​ភ្ជាប់​រូប​តំណាង" />
                <input type="datetime-local" name="datetime" required />
                <input type="submit" value="បញ្ជូន" />
                <input type="hidden" name="videos" value="" />
            </div>
          </form>
      `
      videos = ``
  }

  return(
      <section class="Post">
          <script src="/scripts/ckeditor/ckeditor.js"></script>
          <script src="/scripts/addCategory.js"></script>
          <script src="/scripts/video.js"></script>
          <link rel="stylesheet" href="/styles/admin/post.css" />

          <div dangerouslySetInnerHTML={{__html: `
              ${editor}
          `}}/>
          
          <script src="/scripts/ckeditor/config.js"></script>

          <div class="wrapper" >
              <select name="type">
                <option>YouTube</option>
                <option>YouTubePL</option>
                <option>Facebook</option>
                <option>OK</option>
              </select>
              <input type="text" name="videoid" required placeholder="អត្តសញ្ញាណ​វីដេអូ" />
              <select name="status">
                <option>ចប់</option>
                <option>នៅ​មាន​ត</option>
                <option>~ ចប់</option>
              </select>
              <div dangerouslySetInnerHTML={{__html: `
                  <input onclick="genJson()" type="submit" value="បញ្ចូល​វីដេអូ" />
              `}} />
          </div>

          <div class='viddata'>
            <div></div>
          </div>
          <script dangerouslySetInnerHTML={{__html: `${videos}`}}/>
      </section>
  )
}

export default function Post(props: PageProps){
  props.data.pageInner = PostTsx
  return(
    <Index data={props.data} />
  )
}