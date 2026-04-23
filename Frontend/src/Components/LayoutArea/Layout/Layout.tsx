import { useSelector } from "react-redux"; 
import { Copyrights } from "../Copyrights/Copyrights";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";
import { AppState } from "../../../Redux/AppState";

export function Layout() {
    
    // Get user from global state:
    const user = useSelector((state: AppState) => state.user);

    // Case 1: No user - Centered layout for Login/Register
    if (!user) {
        return (
            <div className="AuthContainer">
                <main className="AuthContent">
                    <Routing />
                </main>
            </div>
        );
    }

    // Case 2: User exists:
    return (
        <div className="Layout">
            
            <header className="MainHeader">
                <Header />
            </header>

            <div className="AppBody">
                <nav className="SideNav">
                    <Menu />
                </nav>

                <main className="MainContent">
                    <div className="ContentCard">
                        <Routing />
                    </div>
                </main>
            </div>

            <footer className="MainFooter">
                <Copyrights />
            </footer>
            
        </div>
    );
}