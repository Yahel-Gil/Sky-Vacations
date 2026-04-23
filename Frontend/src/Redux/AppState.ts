import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";

// Type declaring which data resides in the global state:
export type AppState = {
    user: UserModel | null; // User can be null if not logged in
    vacations: VacationModel[]; // Array of vacations
};