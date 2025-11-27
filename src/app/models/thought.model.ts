import { Age } from "./age.model";
import { Category } from "./category.model";
import { Likes } from "./likes.model";
import { Responses } from "./responses.model";
import { Users } from "./users.model";

export class Thought{
    id!:number;
    title!:string;
    imagePath!:string;
    image!:string;
    desc!:string;
    date!:Date;
    user!:Users;
    category!:Category;
    age!:Age;
    responseList?:Responses[];
    likesList?:Likes[];
}

