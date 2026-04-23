import { StatusCode } from "./enums";

abstract class ClientError {
    public status: StatusCode;
    public message: string;

    public constructor(status: StatusCode, message: string) {
        this.status = status;
        this.message = message;
    }

}

export class RouteNotFoundError extends ClientError {
    public constructor(route: string, method: string) {
        super(StatusCode.NotFound, `Route ${route} on method ${method} not found`);
    }
}

export class ResourceNotFoundError extends ClientError {
    public constructor(id: number | string) {
        super(StatusCode.NotFound, `id ${id} not found`)
    }
}

export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(StatusCode.BadRequest, message)
    }
}

export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(StatusCode.Unauthorized, message);
    }
}