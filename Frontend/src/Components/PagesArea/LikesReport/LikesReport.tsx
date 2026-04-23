import { useEffect, useState } from "react";
import { ReportModel } from "../../../Models/ReportModel";
import { reportsService } from "../../../Services/ReportsService";
import { notify } from "../../../Utils/Notify";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./LikesReport.css";

export function LikesReport() {

    // Component state: 
    const [reportData, setReportData] = useState<ReportModel[]>([]);

    // Get report data from server on component load:
    useEffect(() => {
        reportsService.getLikesReport()
            .then(data => setReportData(data))
            .catch(err => notify.error(err));
    }, []);

    // Export to CSV logic:
    const downloadCSV = () => {
        if (reportData.length === 0) return;

        // Prepare CSV content:
        let csv = "Destination,Likes\n";
        for (const report of reportData) {
            csv += `${report.destinationName},${report.totalLikes}\n`;
        }

        // Create blob and download link:
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const anchorElement = document.createElement("a");
        anchorElement.href = url;
        anchorElement.download = "vacations-report.csv";
        anchorElement.click();
        
        // Clean up:
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="LikesReport">
            
            <div className="Header">
                <h2>Vacations Likes Report</h2>
                <button className="btn btn-success" onClick={downloadCSV}>
                    Download CSV
                </button>
            </div>

            <div className="ChartContainer">
                <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={reportData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="destinationName" 
                            interval={0} 
                            angle={-45} 
                            textAnchor="end" 
                        />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="totalLikes" fill="#4a90e2" barSize={45} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}