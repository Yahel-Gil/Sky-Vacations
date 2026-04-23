import express, { Request, Response, Router } from "express";
import { likesService } from "../4-services/like-service";
import { LikeModel } from "../3-models/like-model";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../6-middleware/security-middleware";
import { cyber } from "../2-utils/cyber";

class LikesController {

    public router: Router = express.Router();

    public constructor() {
        // Only logged-in users can like/unlike:
        this.router.post("/api/like/:vacationId", securityMiddleware.verifyToken, this.like);
        this.router.delete("/api/like/:vacationId", securityMiddleware.verifyToken, this.unlike);
    }

    // Add Like:
    private async like(request: Request, response: Response) {
        try {
            // Get user from token and vacationId from URL:
            const user = cyber.getUserFromToken(request);
            const userId = user.id;
            const vacationId = +request.params.vacationId;

            // Block admin from liking:
            if (user.roleId === 1) { // (1 is Admin)
                return response.status(StatusCode.Forbidden).send("Admins cannot like vacations.");
            }

            // Create LikeModel:
            const like = new LikeModel({ userId, vacationId });
            
            // Validate:
            like.validate();

            await likesService.addLike(like);

            response.status(StatusCode.Created).send();
        } catch (err: any) {
            const status = err.status || StatusCode.InternalServerError;
            response.status(status).send(err.message);
        }
    }

    // Remove Like:
    private async unlike(request: Request, response: Response) {
        try {
            const userId = cyber.getUserFromToken(request).id;
            const vacationId = +request.params.vacationId;

            const like = new LikeModel({ userId, vacationId });
            
            await likesService.removeLike(like);

            response.status(StatusCode.NoContent).send();
        } catch (err: any) {
            response.status(StatusCode.InternalServerError).send(err.message);
        }
    }
}

export const likesController = new LikesController();