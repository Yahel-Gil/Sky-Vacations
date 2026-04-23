import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { Typography, Button, Avatar } from "@mui/material";
import { Logout } from "@mui/icons-material";
import "./UserMenu.css";

export function UserMenu() {

    // Get the current user from global Redux state:
    const user = useSelector<AppState, UserModel | null>(state => state.user);
    
    // Trigger the logout logic from user service:
    function logout() {
        userService.logOut();
    }

    return (
        <div className="UserMenu">

            {/* Render the menu only if a user is currently logged in: */}
            {user && (
                <div className="user-logged-in">
                    
                    {/* User Avatar with first letter of the first name: */}
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "1rem" }}>
                        {user.firstName?.[0]}
                    </Avatar>
                    
                    {/* Displaying personalized greeting: */}
                    <Typography variant="body1">
                        Hello {user.firstName} {user.lastName}
                    </Typography>

                    <span className="separator">|</span>

                    {/* Logout link that triggers the service and redirects home: */}
                    <NavLink to="/home" onClick={logout} className="menu-link">
                        <Button color="error" size="small" startIcon={<Logout />}>
                            Logout
                        </Button>
                    </NavLink>
                </div>
            )}
        </div>
    );
}