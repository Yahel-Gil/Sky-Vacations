class AppConfig {
 
    // By environment:
    public readonly environment = import.meta.env.MODE; // development / production
    public readonly isDevelopment = this.environment === "development";
    public readonly isProduction = this.environment === "production";
    
    // Server host: 
    private readonly host = this.isDevelopment ? "http://localhost:4000" : "https://www.my-production-site.com";
 
    // Server routes:
    public readonly vacationsUrl = `${this.host}/api/vacations/`;
    public readonly likesUrl = `${this.host}/api/like/`;
    public readonly registerUrl = `${this.host}/api/register/`;
    public readonly loginUrl = `${this.host}/api/login/`;
    public readonly usersUrl = `${this.host}/api/users/`; 
    public readonly reportsUrl = `${this.host}/api/likes-report/`;
    public readonly imagesUrl = `${this.host}/api/vacations/images/`;
    


    // MCP Route:
    public readonly mcpServerUrl = "https://unexcusably-pestilential-shaunta.ngrok-free.dev/sse";
     

    // .env 
    public readonly chatGptApiKey = import.meta.env.VITE_CHATGPT_API_KEY;
}
 
export const appConfig = new AppConfig();