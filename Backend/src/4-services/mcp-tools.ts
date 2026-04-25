import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { vacationsService } from "./vacations-service";
import { mcpHelper } from "../2-utils/mcp-helper";
import { reportsService } from "./reports-service";

class McpTools {

    // Get tool result for all vacations:
    public async getAllVacationsTool(): Promise<CallToolResult> {

        console.log("starting getAllVacationsTool");

        // Get all vacations (using userId 0 for general MCP query):
        const vacations = await vacationsService.getAllVacations(0);

        // Return tool result:
        return mcpHelper.getToolResult(vacations);
    }

    // Get tool result for vacations likes report:
    public async getLikesReportTool(): Promise<CallToolResult> {

        console.log("starting getLikesReportTool");

        // Get likes report:
        const report = await reportsService.getLikesReport();

        // Return tool result:
        return mcpHelper.getToolResult(report);
    }

    // Get tool result for vacation statistics:
    public async getVacationStatsTool(): Promise<CallToolResult> {

        console.log("starting getVacationStatsTool");

        // Get all vacations:
        const vacations = await vacationsService.getAllVacations(0);

        // 1. Calculate sum of prices using a simple loop:
        let sum = 0;
        for (const vacation of vacations) {
            sum += +vacation.price; // The '+' converts string '1200.00' to a number
        }

        // 2. Calculate average: 
        const averagePrice = vacations.length > 0 ? sum / vacations.length : 0;

        // 3. Filter upcoming vacations:
        const upcoming = vacations.filter(v => new Date(v.startDate) > new Date());

        // Build the stats object:
        const stats = {
            totalVacations: vacations.length,
            averagePrice: Math.round(averagePrice), // Rounding for a cleaner UI
            upcomingVacations: upcoming.length
        };

        console.log("Calculated Stats:", stats);

        // Return tool result:
        return mcpHelper.getToolResult(stats);
    }

}

export const mcpTools = new McpTools();