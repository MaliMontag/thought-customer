import { Thought } from "./thought.model";

export class Category{
    id!:number;
    categoryName!:string;
    iconPath!:string;
    thoughtsList!:Thought[];
}