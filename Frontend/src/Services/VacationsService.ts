import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { vacationSlice } from "../Redux/VacationSlice";

class VacationsService {

    // Get all vacations from backend:
    public async getAllVacations(): Promise<VacationModel[]> {

        // Get vacations from backend:
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

        // Extract vacations:
        const vacations = response.data;

        // Create action to initialize global state:
        const action = vacationSlice.actions.initVacations(vacations);

        // Send action to reducer:
        store.dispatch(action);

        // Return vacations:
        return vacations;
    }

    // Get one vacation by id:
    public async getOneVacation(id: number): Promise<VacationModel> {

        // If vacation already exists in global state - return it:
        const vacation = store.getState().vacations.find(v => v.id === id);
        if (vacation) {
            return vacation;
        }

        // Otherwise, get from backend:
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
        const dbVacation = response.data;
        return dbVacation;
    }

    // Add a new vacation:
    public async addVacation(vacation: VacationModel): Promise<void> {

        // Convert vacation object to FormData to support image upload:
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination!);
        myFormData.append("description", vacation.description!);
        myFormData.append("startDate", vacation.startDate!);
        myFormData.append("endDate", vacation.endDate!);
        myFormData.append("price", vacation.price?.toString()!);
        myFormData.append("image", vacation.image!); 

        // Send to backend:
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);
        const dbVacation = response.data;

        // Add to global state only if it was already initialized:
        if (store.getState().vacations.length > 0) {
            const action = vacationSlice.actions.addVacation(dbVacation);
            store.dispatch(action);
        }
    }

    // Update an existing vacation:
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // Convert to FormData:
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination!);
        myFormData.append("description", vacation.description!);
        myFormData.append("startDate", vacation.startDate!);
        myFormData.append("endDate", vacation.endDate!);
        myFormData.append("price", vacation.price?.toString()!);
        
        // Only append image if a new one was selected:
        if (vacation.image) {
            myFormData.append("image", vacation.image as File);
        }

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id, myFormData);
        const dbVacation = response.data;

        // Update global state:
        const action = vacationSlice.actions.updateVacation(dbVacation);
        store.dispatch(action);
    }

    // Delete vacation:
    public async deleteVacation(id: number): Promise<void> {

        // Delete from backend:
        await axios.delete(appConfig.vacationsUrl + id);

        // Delete from global state:
        const action = vacationSlice.actions.deleteVacation(id);
        store.dispatch(action);
    }

}

export const vacationsService = new VacationsService();