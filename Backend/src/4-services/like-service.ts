import { dal } from "../2-utils/dal";
import { LikeModel } from "../3-models/like-model";

class LikesService {

    // Add Like:
    public async addLike(like: LikeModel): Promise<void> {
        // SQL query to insert a new like:
        const sql = "insert into likes(userId, vacationId) values(?, ?)"; 
        const values = [like.userId, like.vacationId];
        
        // Execute the query:
        await dal.execute(sql, values);
    }

    // Remove Like:
    public async removeLike(like: LikeModel): Promise<void> {
        // SQL query to delete an existing like:
        const sql = "delete from likes where userId = ? and vacationId = ?"; 
        const values = [like.userId, like.vacationId];
        
        // Execute the query:
        await dal.execute(sql, values);
    }
}

export const likesService = new LikesService();