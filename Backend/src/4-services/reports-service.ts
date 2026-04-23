import { dal } from "../2-utils/dal";
import ReportModel from "../3-models/report-model";

class ReportsService {

    public async getLikesReport(): Promise<ReportModel[]> {
    const sql = `
            SELECT 
                V.id AS vacationId,
                V.destination AS destinationName, 
                (SELECT COUNT(*) FROM likes WHERE vacationId = V.id) AS totalLikes 
            FROM vacations AS V
            ORDER BY totalLikes DESC
        `;

        const reportData = await dal.execute(sql);
        return reportData as ReportModel[];
    }
}

export const reportsService = new ReportsService();