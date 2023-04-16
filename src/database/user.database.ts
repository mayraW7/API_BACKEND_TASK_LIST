import { User } from "../models/user.model";
import { users } from "./users";

export class UserDatabase {

    public create(user: User){users.push(user)};

    public list(){return[...users]};

    public getEmail(email: string){
        return users.find((user)=>user.email === email)};

    public getOne(email: string, pass: string) {
    return users.find((item)=>item.email === email && item.pass === pass)};

    public getCPF(cpf: number){return users.find((user)=>user.cpf === cpf)};

    public getUserID(id: string) {
        return users.find((user)=> user.id === id)};
    
    public setUpdateUser(user:any,userName:string,email:string,password:string){
        if (userName) {user!.userName = userName;}
        if (email) {user!.email = email;}
        if (password) {user!.pass = password;}
        return
    }
    public getIndex(id:string){return users.findIndex((user)=>user.id ===id)};

    public delete(index: number){users.splice(index, 1)};

}