import { Navigate, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { VacationList } from "../../VacationArea/VacationList/VacationList";
import { EditVacation } from "../../VacationArea/EditVacation/EditVacation"; 
import { Page404 } from "../../PagesArea/Page404/Page404";
import { LandingPage } from "../../PagesArea/LandingPage/LandingPage";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { AddVacation } from "../../VacationArea/AddVacation/AddVacation";
import { AIRecommendations } from "../../PagesArea/AIRecommendations/AIRecommendations";
import { McpSupport } from "../../PagesArea/McpSupport/McpSupport";
import { LikesReport } from "../../PagesArea/LikesReport/LikesReport";
import { About } from "../../PagesArea/About/About";

export function Routing() {

    const user = useSelector((state: AppState) => state.user);

    return (
        <Routes>
            
            <Route path="/" element={<Navigate to="/vacations" />} />

            <Route path="/home" element={user ? <Navigate to="/vacations" /> : <LandingPage />} />

            {/* Protected Routes - Monitored by AuthGuard */}
            <Route element={<AuthGuard />}>
                
                {/* Common Routes for all logged-in users */}
                <Route path="/vacations" element={<VacationList />} />
                <Route path="/about" element={<About />} />
                
                {/* Admin Only Routes */}
                {/* We keep the role check here to prevent unauthorized access even if someone is logged in */}
                {user?.roleId === 1 && (
                    <>
                        <Route path="/vacations/edit/:id" element={<EditVacation />} />
                        <Route path="/vacations/add" element={<AddVacation />} />
                        <Route path="/likes-report" element={<LikesReport />} />
                    </>
                )}

                {/* User Only Routes */}
                {user?.roleId === 2 && (
                    <>
                        <Route path="/ai-recommendations" element={<AIRecommendations />} />
                        <Route path="/mcp-support" element={<McpSupport />} />
                    </>
                )}

                {/* User Only Routes - logic for redirection */}
                {!user && (
                    <>
                        <Route path="/ai-recommendations" element={<Navigate to="/home" />} />
                        <Route path="/mcp-support" element={<Navigate to="/home" />} /> 
                    </>
                )}  
                                
            </Route>

            <Route path="*" element={<Page404 />} />

        </Routes>
    );
}