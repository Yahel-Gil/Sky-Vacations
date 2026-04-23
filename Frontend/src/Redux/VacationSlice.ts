import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

// Initialize all vacations:
function initVacations(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    const vacationsToInit = action.payload;
    const newState = vacationsToInit;
    return newState;
}

// Add vacation reducer:
function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const vacationToAdd = action.payload;
    const newState = [...currentState]; // Duplicating currentState.
    newState.push(vacationToAdd);
    return newState;
}

// Update vacation reducer:
function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const vacationToUpdate = action.payload; // Get the vacation to update.
    const newState = [...currentState];
    const index = newState.findIndex(v => v.id === vacationToUpdate.id);
    if (index >= 0) newState[index] = vacationToUpdate;
    return newState;
}

// Delete vacation reducer:
function deleteVacation(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(v => v.id === idToDelete); // Find index to delete.
    if (index >= 0) {
        newState.splice(index, 1); // Delete.
    }
    return newState;
}

// Toggle Like (Like/Unlike):
function toggleLike(currentState: VacationModel[], action: PayloadAction<number>): void {
    
    // Get the vacation id from the action payload:
    const vacationId = action.payload;

    // Find the specific vacation in the current state:
    const vacation = currentState.find(v => v.id === vacationId);

    if (vacation) {
        // Toggle the isLiked boolean:
        vacation.isLiked = !vacation.isLiked;

        // Adjust the likes count based on the new isLiked status:
        if (vacation.isLiked) {
            vacation.likesCount = (vacation.likesCount || 0) + 1;
        } else {
            // Ensure likesCount doesn't go below zero:
            vacation.likesCount = Math.max(0, (vacation.likesCount || 0) - 1);
        }
    }
}


export const vacationSlice = createSlice({
    name: "vacation-slice",
    initialState: [] as VacationModel[],
    reducers: { initVacations, addVacation, updateVacation, deleteVacation, toggleLike }
});