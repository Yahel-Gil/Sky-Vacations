import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { vacationSlice } from "../Redux/VacationSlice";

class LikesService {

    // Toggle like/unlike:
    public async toggleLike(vacationId: number): Promise<void> {

        // Get vacation from Redux:
        const vacation = store.getState().vacations.find(v => v.id === vacationId);
        if (!vacation) return;

        // URL from AppConfig:
        const url = appConfig.likesUrl + vacationId;

        // Backend update:
        if (!vacation.isLiked) {
            await axios.post(url);
        } else {
            await axios.delete(url);
        }

        // Update global state:
        const action = vacationSlice.actions.toggleLike(vacationId);
        store.dispatch(action);
    }

}

export const likesService = new LikesService();