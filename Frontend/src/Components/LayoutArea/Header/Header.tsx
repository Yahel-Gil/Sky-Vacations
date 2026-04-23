import { Typography } from "@mui/material";
import "./Header.css";
import { UserMenu } from "../../UserArea/UserMenu/UserMenu";

export function Header() {
    return (
        <div className="Header">
            
            <div className="LogoContainer">
                {/* Modern icon-like circle or just the text */}
                <div className="LogoIcon">S</div>
                <Typography variant="h5" className="AppTitle">
                    Sky Vacations
                </Typography>
            </div>

            <div className="ActionsContainer">
                <UserMenu />
            </div>

        </div>
    );
}