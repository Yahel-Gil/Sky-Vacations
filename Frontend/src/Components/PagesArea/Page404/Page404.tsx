import { useNavigate } from "react-router-dom";
import wallpaper from "../../../assets/LandingPage-wallpaper.png";
import "./Page404.css";

export function Page404() {
    const navigate = useNavigate();

    return (
        <div className="Page404">
            {/* Full screen background */}
            <img src={wallpaper} className="background-image" alt="Background" />

            {/* Centered wide glass card */}
            <div className="error-card">
                <div className="error-content">
                    <h1 className="error-code">404</h1>
                    <div className="divider"></div>
                    <h2 className="error-title">Oops! Lost in paradise?</h2>
                    <p className="error-text">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                    
                    <button className="back-home-btn" onClick={() => navigate("/vacations")}>
                        Take Me Home
                    </button>
                </div>
            </div>
        </div>
    );
}