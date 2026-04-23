import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";
import "./Menu.css";

export function Menu() {

    // Access user from global state:
    const user = useSelector<AppState, UserModel | null>(state => state.user);

    return (
        <div className="Menu">

            {/* visible for admin and user: */}
            <NavLink to="/vacations" end>Vacations</NavLink>

            {/* Regular User Menu (For user only): */}
            {user && user.roleId === 2 && (
                <>
                    <NavLink to="/ai-recommendations">AI Recommendations</NavLink>
                    <NavLink to="/mcp-support">MCP Support</NavLink>
                </>
            )}

            {/* Admin Menu (Only if admin): */}
            {user?.roleId === 1 && (
                <NavLink to="/likes-report">Likes Report</NavLink>
            )}

            {/* visible fo admin and user: */}
            <NavLink to="/about">About</NavLink>
            
        </div>
    );
}