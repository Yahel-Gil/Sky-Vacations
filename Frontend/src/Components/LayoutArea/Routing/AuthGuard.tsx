import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppState } from "../../../Redux/AppState";

export function AuthGuard() {

    // Access user from global state:
    const user = useSelector((state: AppState) => state.user);

    // Logic: If user exists, go to the child route. If not, go HOME:
    return user ? <Outlet /> : <Navigate to="/home" />;
}