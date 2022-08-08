// models/user.ts

import { mydb } from "setting";
import { bcrypt } from "bcrypt";

interface UserSchema {
    _id: ObjectId;
    id: string; 
    title: string;
    content: string;
    thumb: string;
    date: string;
    role: string;
    email: string;
    password: string;
}

class User{
    async createRootUser(){
        const id = crypto.randomUUID();
        const salt = await bcrypt.genSalt(8);
        const hashPassword = bcrypt.hashSync('xxxxxxxxxxxxxxxxxx', salt);
        const newUser = {
            id: id, 
            title: 'Guest',
            content: '',
            thumb: '',
            date: '',
            role: 'Guest',
            email: 'guest@khmerweb.app',
            password: hashPassword,
        }
     
        const users = mydb.collection<UserSchema>("users");
        await users.insertOne(newUser);
    }

    async checkUser(email: string){
        const users = mydb.collection<UserSchema>("users");
        return await users.findOne({email: email});
    }
}

export default new User();