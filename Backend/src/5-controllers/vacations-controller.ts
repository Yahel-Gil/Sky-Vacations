import express, { Request, Response, Router } from "express";
import { vacationsService } from "../4-services/vacations-service";
import { VacationModel } from "../3-models/vacation-model";
import { StatusCode } from "../3-models/enums";
import { fileSaver } from "uploaded-file-saver";
import { securityMiddleware } from "../6-middleware/security-middleware";
import { cyber } from "../2-utils/cyber";

class VacationsController {

    // Create router:
    public router: Router = express.Router();

    // Register routes:
    public constructor() {
        this.router.get("/api/vacations", securityMiddleware.verifyToken, this.getAllVacations);
        this.router.get("/api/vacations/:id", securityMiddleware.verifyToken, this.getOneVacation);
        this.router.post("/api/vacations", securityMiddleware.verifyAdmin, this.addVacation);
        this.router.put("/api/vacations/:id", securityMiddleware.verifyAdmin, this.updateVacation);
        this.router.delete("/api/vacations/:id", securityMiddleware.verifyAdmin, this.deleteVacation);
        this.router.get("/api/vacations/images/:imageName", this.getImage);
    }

    // Get all vacations:
    private async getAllVacations(request: Request, response: Response) {
        // Extract user from token using cyber utility:
        const user = cyber.getUserFromToken(request);
        const vacations = await vacationsService.getAllVacations(user.id);
        response.json(vacations);
    }

    // Get one vacation:
    private async getOneVacation(request: Request, response: Response) {
        const user = cyber.getUserFromToken(request);
        const id = +request.params.id;
        const vacation = await vacationsService.getOneVacation(id, user.id);
        response.json(vacation);
    }

    // Add vacation:
    private async addVacation(request: Request, response: Response) {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const dbVacation = await vacationsService.addVacation(vacation);
        response.status(StatusCode.Created).json(dbVacation);
    }

    // Update vacation:
    private async updateVacation(request: Request, response: Response) {
        request.body.image = request.files?.image;
        request.body.id = +request.params.id;
        const vacation = new VacationModel(request.body);
        const dbVacation = await vacationsService.updateVacation(vacation);            response.json(dbVacation);
    }

    // Delete vacation:
    private async deleteVacation(request: Request, response: Response) {
        const id = +request.params.id;
        await vacationsService.deleteVacation(id);
        response.status(StatusCode.NoContent).send();
    }

    // Get image by image name:
    private async getImage(request: Request, response: Response) {
        const imageName = request.params.imageName.toString();
        const filePath = fileSaver.getFilePath(imageName);
        response.sendFile(filePath);
    }
}

export const vacationsController = new VacationsController();