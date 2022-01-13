import Post from "./post.interface";
import postModel from "./post.model";

class PostService {
    

    private post = postModel

     /**
      * create a new post
      */
    public async create(title:string, body:string):Promise<Post>{
        try {
            const post = await this.post.create({title,body})
            return post
            
        } catch (error) {
            throw new Error("Unable to create a post")
            
        }
    }
}

export default PostService