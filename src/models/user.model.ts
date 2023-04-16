import { v4 as createUuid } from "uuid";
import { Task } from "./task.model";

export class User {
    private _id: string;
    private _tasks: Task[];
        constructor(private _userName:string, private _email:string, private _cpf:number, private _pass:string){
            this._id = createUuid();
            this._tasks = [];
        }

//--------------GETTERS--------------------

    public get id(){
        return this._id;
    }
    public get userName(){
        return this._userName;
    }
    public get cpf(){
        return this._cpf;
    }
    public get email(){
        return this._email;
    }
    public get pass(){
        return this._pass;
    }
    public get tasks(){
        return this._tasks ?? [];
    }


//--------------SETTERS--------------------

    public set userName(userName:string){
        this._userName = userName;
    }
    public set email(email:string){
        this._email = email;
    }
    public set pass(pass:string){
        this._pass = pass;
    }
    public addTask(task: Task) {
        this._tasks.push(task);
    }
    public toJson(){
        return {
            userId: this._id,
            userName: this.userName,
            email: this.email,
            cpf: this.cpf,
            tasks: this.tasks,
        };
    }
}