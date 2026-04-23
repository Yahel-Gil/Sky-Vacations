import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// Initialize user:
function initUser(_currentState: UserModel | null, action: PayloadAction<UserModel>): UserModel | null {
    const newState = action.payload;
    return newState;
}

// Logout user:
function logOutUser(_currentState: UserModel | null): UserModel | null {
    return null;
}

export const userSlice = createSlice({
    name: "user-slice",
    initialState: null as UserModel | null,
    reducers: { initUser, logOutUser }
});