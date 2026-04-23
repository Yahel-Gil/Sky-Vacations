import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpTools } from "./mcp-tools";

class McpRegister {

    // Register getAllVacations tool:
    public registerGetAllVacationsTool(mcpServer: McpServer): void {
        const config = {
            description: "Get all database vacations including destination, description, dates and price."
        };
        mcpServer.registerTool("getAllVacations", config, mcpTools.getAllVacationsTool);
    }

    // Register getLikesReport tool:
    public registerGetLikesReportTool(mcpServer: McpServer): void {
        const config = {
            description: "Get database vacations likes report showing how many followers each vacation has."
        };
        mcpServer.registerTool("getLikesReport", config, mcpTools.getLikesReportTool);
    }

    // Register getVacationStats tool:
    public registerGetVacationStatsTool(mcpServer: McpServer): void {
        const config = {
            description: "Get general database statistics such as total vacations count and average price."
        };
        mcpServer.registerTool("getVacationStats", config, mcpTools.getVacationStatsTool);
    }

}

export const mcpRegister = new McpRegister();