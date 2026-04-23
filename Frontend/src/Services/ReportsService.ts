import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { ReportModel } from "../Models/ReportModel";

class ReportsService {

    public async getLikesReport(): Promise<ReportModel[]> {
        const response = await axios.get<ReportModel[]>(appConfig.reportsUrl);
        return response.data;
    }
}

export const reportsService = new ReportsService();