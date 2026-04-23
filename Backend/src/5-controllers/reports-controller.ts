import express, { Request, Response, Router } from "express";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../6-middleware/security-middleware";
import { reportsService } from "../4-services/reports-service";

class ReportsController {

    public router: Router = express.Router();

    public constructor() {
        // Get likes report (Admin only):
        this.router.get("/api/likes-report", securityMiddleware.verifyAdmin, this.getLikesReport);
    }

    // Get likes report:
    private async getLikesReport(request: Request, response: Response) {
        try {
            const report = await reportsService.getLikesReport();
            response.json(report);
        } catch (err: any) {
            response.status(StatusCode.InternalServerError).send(err.message);
        }
    }
}

export const reportsController = new ReportsController();