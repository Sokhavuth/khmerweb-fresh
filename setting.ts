// setting.js

function setting(){
    const configure = {
        site_title: "ពហុព័ត៌មាន",
        page_title: "ទំព័រ​ដើម",
        message: "",
        count: 0,
        post_amount: 10,
        username: '',
        items: [],
    }

    return configure
}

import { config } from "config"
await config({export: true})
const secret_key = Deno.env.get("SECRET_KEY")
/*
import { create, verify, getNumericDate } from "jwt"
const payload = { 
    user: "user", 
    exp: getNumericDate(60 * 60 * 24), 
    signature: secret_key,
}
const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, secret_key)
//const payload = await verify(jwt, secret_key, "HS512")
*/

import { MongoClient } from "mongodb"
const client = await new MongoClient()
await client.connect(Deno.env.get('DATABASE_URI'))
const mydb = client.database(Deno.env.get('DB_NAME'))


import { connect } from "redis"
const myredis = await connect({
    hostname: Deno.env.get('REDIS_URI'),
    port: parseInt(Deno.env.get('REDIS_PORT')),
    password: Deno.env.get('REDIS_PASSWORD'),
})

//////////////////////////////////////////////

export { setting, secret_key, mydb, myredis }