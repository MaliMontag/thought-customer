import { Thought } from "./thought.model";
import { Responses } from "./responses.model";
import { Likes } from "./likes.model";
export class Users{
    id!:number;
    userName!:string;
    password!:string;
    eMail!:string;
    imagePath!:string;
    toughtsList!:Thought[];
    responseList!:Responses[];
    likeList!:Likes[];

}