import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";
import { ResourceNotFoundError } from "../3-models/errors";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";

class VacationsService {
    
    // Get all vacations:
public async getAllVacations(userId: number): Promise<VacationModel[]> {

    // Optimized SQL: Get vacations, count total likes, and check if SPECIFIC user liked each one:
    const sql = `
        SELECT DISTINCT
            V.*,
            CONCAT(?, V.imageName) AS imageUrl,
            COUNT(L.vacationId) OVER(PARTITION BY L.vacationId) AS likesCount,
            EXISTS(SELECT * FROM likes WHERE vacationId = V.id AND userId = ?) AS isLiked
        FROM vacations AS V
        LEFT JOIN likes AS L ON V.id = L.vacationId
        ORDER BY V.startDate
    `;

    const values = [appConfig.imageLocation, userId];

    // Execute:
    const vacations = await dal.execute(sql, values) as VacationModel[];

    // Convert 1/0 to true/false for each vacation:
    for (const v of vacations) {
        v.isLiked = !!v.isLiked; 
    }

    // Return:
    return vacations;
}


    // Get one vacation:
    public async getOneVacation(id: number, userId: number): Promise<VacationModel> {

        // Optimized SQL: Get the specific vacation, total likes, and current user's like status in one go:
        const sql = `
            SELECT 
                V.*, 
                CONCAT(?, V.imageName) AS imageUrl,
                (SELECT COUNT(*) FROM likes WHERE vacationId = V.id) AS likesCount,
                EXISTS(SELECT * FROM likes WHERE vacationId = V.id AND userId = ?) AS isLiked
            FROM vacations AS V
            WHERE V.id = ?
        `;

        const values = [appConfig.imageLocation, userId, id];

        // Execute:
        const vacations = await dal.execute(sql, values) as VacationModel[];

        // Extract the single vacation:
        const vacation = vacations[0];

        if (vacation) {
            vacation.isLiked = !!vacation.isLiked; // Convert to boolean
        }

        // If no such vacation:
        if (!vacation) throw new ResourceNotFoundError(id);

        // Return:
        return vacation;
    }



    // Add vacation:
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        // Validation:
        vacation.validateInsert();

        // Save the image:
        const imageName = vacation.image ? await fileSaver.add(vacation.image) : null;

        // Create sql:
        const sql = "insert into vacations(destination, description, startDate, endDate, price, imageName) values(?, ?, ?, ?, ?, ?)";
        const values = [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName];

        // Execute:
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        
        // Get the added vacation from the database (userId 0 as it's a new vacation):
        const dbVacation = await this.getOneVacation(info.insertId!, 0);

        // Return:
        return dbVacation;
    }


    // Update vacation:
    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

        // Validation:
        vacation.validateUpdate();

        // Update image:
        const oldImageName = await this.getImageName(vacation.id);
        const newImageName = vacation.image ? await fileSaver.update(oldImageName!, vacation.image) : oldImageName;

        // Create sql:
        const sql = "update vacations set destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? where id = ?";
        const values = [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, newImageName, vacation.id];

        // Execute:
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        
        // If no such vacation:
        if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);

        // Get the updated vacation from the database (userId 0 as update is usually by Admin):
        const dbVacation = await this.getOneVacation(vacation.id, 0);

        // Return:
        return dbVacation;
    }

    // Delete vacation:
    public async deleteVacation(id: number): Promise<void> {

        // Get old image:
        const oldImageName = await this.getImageName(id);

        // Create sql:
        const sql = "delete from vacations where id = ?";
        const values = [id];

        // Execute:
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;

        // If no such vacation:
        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

        // Delete image:
        if (oldImageName) await fileSaver.delete(oldImageName);
    }


    // Get image name from db:
    private async getImageName(id: number): Promise<string | null> {
        const sql = "select imageName from vacations where id = ?";
        const values = [id];
        const vacations = await dal.execute(sql, values) as VacationModel[];
        const vacation = vacations[0];
        if (!vacation) return null;
        return vacation.imageName;
    }
}

export const vacationsService = new VacationsService();