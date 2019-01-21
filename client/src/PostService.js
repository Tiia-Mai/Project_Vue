import axios from 'axios';
//import { resolve } from "url";
//import { rejects } from "assert";

const url='api/posts/';


//PostService class
class PostService{

    //Get Posts
    static getPosts(){
        return new Promise(async (resolve, reject) =>{
            try{
               const res=await axios.get(url);
               const data= res.data;
               resolve(
                   data.map(post=>({
                       ...post,
                       createdAt: new Date(post.createdAt)
                   }))
               );
            }catch(err){
                reject(err);
            }
        });
    }

    //Get one post
    static getPost(id){
        return axios.get(`${url}${id}`);
    }

    //Update post
    static updatePost(id, name, title, text){
        return axios.put(`${url}${id}`,{
            name:name,
            title:title,
            text:text
        });
    }

    //Create Posts
    static insertPost(name, title, text){
     return axios.post(url, {
         name:name,
         title:title,
         text:text
     });
    }

    //Delete Posts
    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }

}

//export
export default PostService;