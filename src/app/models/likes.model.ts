import { Thought } from "./thought.model";
import { Users } from "./users.model";

export class Likes{
    id!:number;
    thought!:Thought;
    user!:Users;
}