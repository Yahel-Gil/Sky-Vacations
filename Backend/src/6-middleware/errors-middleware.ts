import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../3-models/errors";
import { StatusCode } from "../3-models/enums";
import { appConfig } from "../2-utils/app-config";

class ErrorMiddleware {

    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

        // Print to console:
        console.log(err);

        // Get HTTP status:
        const status = err.status || StatusCode.InternalServerError;

        // Is server error:
        const isServerError = status >= 500 && status <= 599;

        // Get error message:
        const message = isServerError && appConfig.isProduction ? "Some error, please try again." : err.message;

        // Return error to front:
        response.status(status).send(message);
    }

    public routerNotFound(request: Request, response: Response, next: NextFunction): void {
        next(new RouteNotFoundError(request.originalUrl, request.method));
    }

    public ping(request: Request, response: Response, next: NextFunction): void {
        response.send("pong");
    }

}

export const errorMiddleware = new ErrorMiddleware();