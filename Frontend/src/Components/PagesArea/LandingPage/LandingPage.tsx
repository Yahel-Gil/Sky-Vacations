import { useState } from "react";
import { Login } from "../../UserArea/Login/Login";
import { Register } from "../../UserArea/Register/Register";
import wallpaper from "../../../assets/LandingPage-wallpaper.png";
import "./LandingPage.css";

export function LandingPage() {
    
    // Component state management:
    const [view, setView] = useState<string>("WELCOME");

    return (
        <div className="LandingPage">
            
            {/* Background image - keeping your exact implementation */}
            <img src={wallpaper} className="background-image" alt="Background" />

            {/* Main authentication card */}
            <div className="auth-card">
                
                {/* Initial welcome screen */}
                {view === "WELCOME" && (
                    <div className="welcome-view">
                        <h1>Sky Vacations</h1>
                        <p>Discover your next adventure. Join our community to manage and track the most exciting vacations around the world.</p>
                        <div className="actions">
                            <button className="primary-btn" onClick={() => setView("LOGIN")}>Sign In</button>
                            <button className="secondary-btn" onClick={() => setView("REGISTER")}>Join Now</button>
                        </div>
                    </div>
                )}

                {/* Login view */}
                {view === "LOGIN" && (
                    <div className="form-container">
                        <Login />
                        <div className="view-footer">
                            <button className="link-btn" onClick={() => setView("REGISTER")}>
                                New here? Create an account
                            </button>
                            <button className="back-btn" onClick={() => setView("WELCOME")}>← Back</button>
                        </div>
                    </div>
                )}

                {/* Registration view */}
                {view === "REGISTER" && (
                    <div className="form-container">
                        <Register />
                        <div className="view-footer">
                            <button className="link-btn" onClick={() => setView("LOGIN")}>
                                Already have an account? Sign in
                            </button>
                            <button className="back-btn" onClick={() => setView("WELCOME")}>← Back</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}