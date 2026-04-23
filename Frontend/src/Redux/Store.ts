import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { userSlice } from "./UserSlice";
import { vacationSlice } from "./VacationSlice";


export const store = configureStore<AppState>({
    reducer: {
        user: userSlice.reducer,
        vacations: vacationSlice.reducer,
    }
});