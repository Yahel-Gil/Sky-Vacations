import { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box, CircularProgress } from "@mui/material";
import { aiService } from "../../../Services/AiService";
import { notify } from "../../../Utils/Notify";
import "./AIRecommendations.css";

export function AIRecommendations() {

    // Local state for UI and AI response:
    const [destination, setDestination] = useState<string>("");
    const [recommendation, setRecommendation] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Handle AI request logic:
    async function send() {
        if (!destination.trim()) {
            notify.error("Please enter a destination first.");
            return;
        }
        try {
            setLoading(true);
            setRecommendation(""); // Reset previous result for a clean look
            
            // Fetching destination-based recommendation from the AI service:
            const answer = await aiService.getRecommendation(destination);
            setRecommendation(answer);
        }
        catch (error: any) {
            notify.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="md" className="ai-container-wrapper">
            
            {/* Minimalist Floating Card: */}
            <Paper elevation={0} className={`AIPaper ${recommendation ? "has-recommendation" : ""}`}>
                
                <Typography variant="h4" className="ai-main-title">
                    Explore Your Next Adventure ✈️
                </Typography>

                <Box className="ai-input-group">
                    <TextField 
                        fullWidth 
                        label="Enter a city or country..." 
                        className="ai-text-field"
                        value={destination}
                        // Update state as user types:
                        onChange={(event) => setDestination(event.target.value)}
                        // Allow pressing 'Enter' to submit:
                        onKeyDown={(event) => event.key === 'Enter' && send()}
                        slotProps={{ inputLabel: { shrink: true } }}
                        disabled={loading}
                    />
                    <Button 
                        variant="contained" 
                        onClick={send} 
                        disabled={loading || !destination.trim()} 
                        className="ai-plan-btn"
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Get Plan"}
                    </Button>
                </Box>

                {/* AI Result Area - Only renders when response is ready: */}
                {recommendation && (
                    <Box className="recommendation-result">
                        <Typography variant="h6" className="result-header">
                            Our AI Recommendation:
                        </Typography>
                        <div 
                            className="result-content" 
                            dangerouslySetInnerHTML={{ __html: recommendation }} 
                        />
                    </Box>
                )}
            </Paper>
        </Container>
    );
}