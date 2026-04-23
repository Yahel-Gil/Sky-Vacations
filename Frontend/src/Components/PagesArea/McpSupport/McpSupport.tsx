import { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box, CircularProgress, Divider } from "@mui/material";
import StorageIcon from '@mui/icons-material/Storage';;
import { gptService } from "../../../Services/GptService";
import { notify } from "../../../Utils/Notify";
import "./McpSupport.css";

export function McpSupport() {

    // Interaction states:
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Executing MCP database query logic:
    async function askMcp() {
        if (!question.trim()) return;

        try {
            setLoading(true);
            setAnswer(""); // Resetting answer for new query
            
            // Calling the GPT service which interacts with our MCP server:
            const result = await gptService.getMcpResult(question);
            setAnswer(result);
        }
        catch (error: any) {
            notify.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="md" className="mcp-container-wrapper">
            
            {/* Floating Paper - White on White with Soft Shadow: */}
            <Paper elevation={0} className={`McpPaper ${answer ? "has-answer" : ""}`}>
                
                <Box className="mcp-header">
                    <StorageIcon className="mcp-icon" />
                    <Typography variant="h4" className="mcp-main-title">
                        Sky Vacations Data Assistant
                    </Typography>
                    <Typography variant="body1" className="mcp-subtitle">
                        Ask me anything about our destination stats, likes, or prices.
                    </Typography>
                </Box>

                <Box className="mcp-input-group">
                    <TextField 
                        fullWidth 
                        variant="outlined"
                        placeholder="What is the average price for a vacation on the site?" 
                        className="mcp-text-field"
                        multiline 
                        maxRows={10}
                        value={question}
                        // Update state as user types:
                        onChange={(event) => setQuestion(event.target.value)}
                        // Allow pressing 'Enter' to submit:
                        onKeyDown={(event) => event.key === 'Enter' && askMcp()}
                        disabled={loading}
                    />
                    <Button 
                        variant="contained" 
                        onClick={askMcp} 
                        disabled={loading || !question.trim()}
                        className="mcp-query-btn"
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Query DB"}
                    </Button>
                </Box>

                {/* Response area - Dynamic height: */}
                {answer && (
                    <Box className="mcp-result-section">
                        <Typography variant="h6" className="mcp-result-header">
                            AI Insight:
                        </Typography>
                        <Divider className="mcp-divider" />
                        
                        <div 
                            className="mcp-result-content"
                            dangerouslySetInnerHTML={{ __html: answer }} 
                        />
                    </Box>
                )}
            </Paper>
        </Container>
    );
}