// 1. External Libraries 
import express, { Request, Express } from "express";
import cors from "cors";
import helmet from "helmet";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import { fileSaver } from "uploaded-file-saver";

// 2. Node.js Core Modules 
import fs from "fs";
import path from "path";
import https, { ServerOptions } from "https";

// 3. Own Files 
import { appConfig } from "./2-utils/app-config";
import { authController } from "./5-controllers/auth-controller";
import { errorMiddleware } from "./6-middleware/errors-middleware";
import { securityMiddleware } from "./6-middleware/security-middleware";
import { vacationsController } from "./5-controllers/vacations-controller";
import { likesController } from "./5-controllers/likes-controller";

// 4. MCP Server
import { sseHandlers } from "express-mcp-handler";
import { vacationsMcpServer } from "./4-services/mcp-server";
import { reportsController } from "./5-controllers/reports-controller";

class App {

    public server!: Express;
     
    public async start(): Promise<void> {
    
        // Create express server:
        this.server = express();

        // Prevent Dos attack:
        this.server.use(expressRateLimit({
            windowMs: 1000, // Time window.
            limit: 20, // How many requests are permitted in this time window.
            // Skip rate limit for vacation images:
            skip: (request: Request) => request.path.startsWith("/api/vacations/images") 
        }));

        // Ping for testing:
        this.server.use("/ping", errorMiddleware.ping);

        // Tell express that request.body is a JSON format:
        this.server.use(express.json());

        // Enable CORS:
        this.server.use(cors());

        // Use helmet for prevent headers attack:
        this.server.use(helmet({
            crossOriginResourcePolicy: { policy: "same-site" } // Enable CORS on images.
        }));

        // Image configuration:
        this.server.use(expressFileUpload());
        const imageLocation = path.join(__dirname, "1-assets", "images");
        fileSaver.config(imageLocation); // Tell library where to save uploaded files.

        // Prevent XSS attack (Cross-Site Scripting):
        this.server.use(securityMiddleware.preventXss);

        // MCP server:
        const mcpServer = vacationsMcpServer.createMcpServer(); // Create the MCP server
        const factory = () => mcpServer as any; // Create factory function returning the server.
        const { getHandler, postHandler } = sseHandlers(factory, {}); // Create two routers for handling get and post
        this.server.get("/sse", getHandler); // Register get handler for getting tool list.
        this.server.post("/messages", postHandler); // Register post handler for getting data from correct tool.

        // Connect controllers:
        this.server.use(authController.router);
        this.server.use(vacationsController.router);
        this.server.use(likesController.router);
        this.server.use(reportsController.router);
        
        // Register error middleware (Must be last):
        this.server.use(errorMiddleware.routerNotFound);
        this.server.use(errorMiddleware.catchAll);

        // Listen (Simplified to HTTP only):
        this.server.listen(appConfig.port, () => {
            console.log("-----------------------");
            console.log("Sky Vacations Server");
            console.log("Listening on http://localhost:" + appConfig.port);
            console.log("-----------------------");
        });
    }
}

export const app = new App();
app.start();