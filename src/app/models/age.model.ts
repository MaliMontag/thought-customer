import { Thought } from "./thought.model";
import { Users } from "./users.model";

export class Age{
    id!:number;
    ageName!: string;
    thoughtList!:Thought[];
}