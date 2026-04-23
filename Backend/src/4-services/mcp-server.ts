import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpRegister } from "./mcp-register";

class VacationsMcpServer {

    // Create MCP server:
    public createMcpServer(): McpServer {

        // Create mcp server:
        const mcpServer = new McpServer({
            name: "vacations-mcp",
            version: "1.0.0"
        });
        
        // Register tools:
        mcpRegister.registerGetAllVacationsTool(mcpServer);
        mcpRegister.registerGetLikesReportTool(mcpServer);
        mcpRegister.registerGetVacationStatsTool(mcpServer);

        // Return the MCP server:
        return mcpServer;
    }

}

export const vacationsMcpServer = new VacationsMcpServer();