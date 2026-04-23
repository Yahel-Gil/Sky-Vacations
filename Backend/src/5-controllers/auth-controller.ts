import express, { NextFunction, Request, Response, Router } from "express";
import { UserModel } from "../3-models/user-model";
import { authService } from "../4-services/auth-service";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";
import { securityMiddleware } from "../6-middleware/security-middleware";

class AuthController {

    // Create router:
    public router: Router = express.Router();

    // Register routes:
    public constructor() {
        this.router.post("/api/register", this.register);
        this.router.post("/api/login", this.login);
        this.router.get("/api/users/:id", securityMiddleware.verifyToken, securityMiddleware.verifyMe, this.getOneUser);
    }

    // Register new user:
    private async register(request: Request, response: Response, next: NextFunction) {
        try {
            const user = new UserModel(request.body);
            const token = await authService.register(user);
            response.status(StatusCode.Created).json(token);
        }
        catch (err: any) {
            next(err);
        }
    }

    // Login existing user:
    private async login(request: Request, response: Response, next: NextFunction) {
        try {
            const credentials = new CredentialsModel(request.body);
            const token = await authService.login(credentials);
            response.json(token);
        }
        catch (err: any) {
            next(err);
        }
    }

    // Get one user:
    private async getOneUser(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id;
            const user = await authService.getOneUser(id); 
            response.json(user);
        }
        catch (err: any) {
            next(err);
        }
    }
}

export const authController = new AuthController();