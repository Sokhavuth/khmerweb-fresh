// models/post.ts

import { mydb } from "setting"

interface PostSchema {
    _id: ObjectId;
    id: string; 
    title: string;
    content: string;
    categories: string[];
    thumb: string;
    date: string;
    videos: string;
    userid: string;
}

class Post{
    async count(query={}){
        const posts = mydb.collection<PostSchema>("posts")
        return await posts.countDocuments(query)
    }

    async insertPost(req, user_id: string){
        const id = crypto.randomUUID()
        const formData = await req.formData()

        let categories: string[]

        if(formData.get("categories").includes(',')){
            categories = formData.get("categories").split(',')
        }else{
            categories = [formData.get("categories")]
        }
        
        const new_post = {
            id: id, 
            title: formData.get("title"),
            content: formData.get("content"),
            categories: categories,
            thumb: formData.get("thumb"),
            date: formData.get("datetime"),
            videos: formData.get("videos"),
            userid: user_id,
        }
 
        const posts = mydb.collection<PostSchema>("posts")
        await posts.insertOne(new_post)
    }

    async getPosts(amount: number, query={}){
        const posts = mydb.collection<PostSchema>("posts")
        return await posts.find(query).sort({date:-1,_id:-1}).limit(amount).toArray()
    }

    async getPost(post_id: string){
        const posts = mydb.collection<PostSchema>("posts")
        return await posts.findOne({id: post_id})
    }

    async updatePost(req, post_id: string){
        const formData = await req.formData()

        let categories: string[]

        if(formData.get("categories").includes(',')){
            categories = formData.get("categories").split(',')
        }else{
            categories = [formData.get("categories")]
        }

        const edited_post = {$set:{
            title: formData.get("title"),
            content: formData.get("content"),
            categories: categories,
            thumb: formData.get("thumb"),
            date: formData.get("datetime"),
            videos: formData.get("videos"),
        }}

        const posts = mydb.collection<PostSchema>("posts")
        await posts.updateOne({id: post_id}, edited_post)
    }

    async deletePost(post_id: string){
        const posts = mydb.collection<PostSchema>("posts")
        await posts.deleteOne({id: post_id})
    }

}

export default new Post()