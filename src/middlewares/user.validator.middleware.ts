import {NextFunction, Request, Response,} from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { CPFvalidatorMiddleware } from "./cpf_validator.middleware";

  
export class UserValidatorMiddleware {
public static validationsRequiredFields(req: Request, res: Response,
    next: NextFunction) {
    try {
    const { userName, email, pass } = req.body;

    if (!userName) {
        return RequestError.fieldNotProvided(res,"Username");}
    if (!email) {
        return RequestError.fieldNotProvided(res,"Email");}
    if (!pass) {
        return RequestError.fieldNotProvided(res,"Password");}
    next();
    } catch (error: any) {
    return ServerError.genericError(res, error);
    }
}

public static emailAlreadyExist(req: Request, res: Response, 
    next: NextFunction) {
    try {
    const { email } = req.body;

    const database = new UserDatabase();
    const userEmail = database.getEmail(email);

    if (userEmail) {
        return RequestError.badRequest(res, "Email")
    }
    next();
    } catch (error: any) {
    return ServerError.genericError(res, error);
    }
}

public static userExist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return RequestError.fieldNotProvided(
          res,
          "User"
        );
      }

      const database = new UserDatabase();
      const user = database.getUserID(userId);

      if (!user) {
        return RequestError.notFound(res, "User");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
}

public static isLoginValid(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
    const { email, pass } = req.body;

    if (!email) {
        return RequestError.fieldNotProvided(res,"Email");
    }
    if (!pass) {return RequestError.fieldNotProvided(res,"Password");
    }

    const database = new UserDatabase();
    let user = database.getEmail(email);

    if (!user) {
        return RequestError.invalidAccess(res,"User");
    }

    if (user.pass !== pass) {
        return RequestError.forbidden(res);
    }    next();
    } catch (error: any) {
    return ServerError.genericError(res, error);
    }
}

public static idUserValid(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
    const { userId } = req.params;
    const database = new UserDatabase();
    let userID = database.getUserID(userId);
    if (!userID) {
        return RequestError.fieldNotProvided(res,"Id user");
    }

next();
} catch (error: any) {
return ServerError.genericError(res, error);
}
}
}

export const validationsUserCreate = [UserValidatorMiddleware.validationsRequiredFields, UserValidatorMiddleware.emailAlreadyExist,CPFvalidatorMiddleware.cpfAlreadyExists,];

export const validationsUserLogin = [UserValidatorMiddleware.isLoginValid,];

export const idValidation = [UserValidatorMiddleware.idUserValid];

export const updateValidator = [UserValidatorMiddleware.emailAlreadyExist, UserValidatorMiddleware.idUserValid];

export const validationsUserExist = [UserValidatorMiddleware.userExist,];