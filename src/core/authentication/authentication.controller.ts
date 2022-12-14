import { Request, Response, NextFunction } from "express";
import { TOKEN_SECRET } from "../../constants";
import { jwtUserData, systemError, authenticationToken} from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import AuthenticationService from "../authentication/authentication.service";
import jwt from "jsonwebtoken";

interface localUser {
  login: string;
  password: string;
}
class AuthenticationController {
  constructor() { }

  async login(req: Request, res: Response, next: NextFunction) {
    const user: localUser = req.body;

    try {
      const userData: jwtUserData = await AuthenticationService.login(user.login, user.password);

      const authenticationToken: authenticationToken = {
        userData: userData
      };

      const token: string = jwt.sign(
        authenticationToken,
        TOKEN_SECRET,
        {
          expiresIn: "2h",
        });

      return res.status(200).json({
        token: token
      });
    }
    catch (error: any) {
      return ResponseHelper.handleError(res, error as systemError, true);
    }
  }
}

export default new AuthenticationController();