import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../3-models/errors";
import { cyber } from "../2-utils/cyber";
import striptags from "striptags";

class SecurityMiddleware {

    // Verify legal token:
    public verifyToken(request: Request, response: Response, next: NextFunction): void {
        const token = cyber.extractToken(request);

        if (!cyber.verifyToken(token)) {
            next(new UnauthorizedError("You are not logged in"));
            return;
        }
        // all is good:
        next();
    }

    // Verify admin role:
    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {
        const token = cyber.extractToken(request);

        if (!cyber.verifyAdmin(token)) {
            next(new UnauthorizedError("You are not authorized"));
            return;
        }
        // all is good:
        next();
    }

    // Prevent XSS attacks (Cross-Site Scripting):
    public preventXss(request: Request, response: Response, next: NextFunction): void {
        for (const prop in request.body) {
            const value = request.body[prop];
            if (typeof value === "string") {
                request.body[prop] = striptags(value);
            }
        }
        // all is good:
        next();
    }

    // Verify the user is the owner of the resource:
    public verifyMe(request: Request, response: Response, next: NextFunction): void {
        const token = cyber.extractToken(request);
        const tokenUserId = cyber.getTokenUserId(token);
        const routeId = +request.params.id;

        if (tokenUserId !== routeId) {
            next(new UnauthorizedError("You are not authorized"));
            return;
        }
        // all is good:
        next();
    }
}

export const securityMiddleware = new SecurityMiddleware();