import { Thought } from "./thought.model";
import { Users } from "./users.model";

export class Responses{
    id!:number;
    content!:string;
    date!:Date;
    thought!:Thought;
    user!:Users;
}