import "./Copyrights.css";

export function Copyrights() {

    // Get current year dynamically:
    const currentYear = new Date().getFullYear();

    return (
        <div className="Copyrights">
            <p>© {currentYear} Sky Vacations. All rights reserved.</p>
        </div>
    );
}