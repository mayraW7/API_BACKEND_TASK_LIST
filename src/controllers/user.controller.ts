import { Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { ServerError } from "../errors/server.error";
import { User } from "../models/user.model";
import { SuccessResponse } from "../util/response.success";
import { RequestError } from "../errors/request.error";


export class UserController {
    public createUser(req: Request, res: Response){
        try{
            const {userName, email, cpf, pass } = req.body;

            const database = new UserDatabase();
            const userCreated = new User (userName, email,cpf,pass);
            database.create(userCreated);

            return SuccessResponse.created(res,"New user successfully created!", userCreated.toJson)
        }catch (error:any){
            return ServerError.genericError(res,error);
        }
    }

    public loginUser (req: Request, res: Response){
        try{
            const {email,pass} = req.body;
            const database = new UserDatabase();
            let user = database.getOne(email,pass);
            return SuccessResponse.success(
                res,"User successfully obtained",user?.toJson());
        }catch(error:any){
            return ServerError.genericError(res,error)
        }
    }

    public getId (req: Request, res: Response){
        try{
            const { userId } = req.params;
            const database = new UserDatabase();
            let user = database.getUserID(userId);
            if(!user) {
                return RequestError.notFound(res, "User");
            }
            const idResult = user.toJson();

            return SuccessResponse.success(res,"Usuário:", idResult);
        
        }catch(error:any){
            return ServerError.genericError(res,error)
        }
    }

    public deleteUser (req: Request, res: Response){
        try{
            const {userId} = req.params;
            const database = new UserDatabase();
            const indexUser = database.getIndex(userId);
            if (indexUser < 0) {return RequestError.notFound(res,"User")}
            const user = database.delete(indexUser);
            return SuccessResponse.success(res,"User successfully deleted",user);
        }catch(error:any){
            return ServerError.genericError(res,error)
        }
    }

    public updateUser (req: Request, res: Response){
        try{
            const { userId } = req.params;
            const { userName, email, password } = req.body;
            const database = new UserDatabase();
            const user = database.getUserID(userId);
            database.setUpdateUser(user,userName,email,password);
            
            return SuccessResponse.success(res, "User successfully update",user);
            
        }catch(error:any){
            return ServerError.genericError(res,error)
        }
    }
}


