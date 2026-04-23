import { Container, Paper, Typography, Box, Divider } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import "./About.css";

export function About() {
    return (
        <Container maxWidth="md" className="about-container-wrapper">
            
            {/* Minimalist Floating Card: */}
            <Paper elevation={0} className="AboutPaper">
                
                {/* Header Section: */}
                <Box className="about-header">
                    <InfoIcon className="about-icon" />
                    <Typography variant="h4" className="about-main-title">
                        About Sky Vacations
                    </Typography>
                </Box>

                <Divider className="about-divider" />

                {/* Content Section: */}
                <Box className="about-content">
                    <Typography variant="body1" component="p">
                        Welcome to <strong>Sky Vacations</strong>, your ultimate gateway to exploring the world. 
                        Our platform is designed to provide you with the best travel destinations, 
                        real-time updates, and AI-powered recommendations to make your next trip unforgettable.
                    </Typography>

                    <Typography variant="body1" component="p">
                        Whether you are looking for a quiet retreat in the mountains or a vibrant city break, 
                        our system tracks the latest trends, prices, and follower insights to help you 
                        decide where your next adventure begins.
                    </Typography>

                    <Box className="about-mission-box">
                        <Typography variant="h6" className="mission-title">
                            Our Mission
                        </Typography>
                        <Typography variant="body2">
                            To simplify travel planning by combining data-driven insights with 
                            cutting-edge AI technology, all within a clean and intuitive user experience.
                        </Typography>
                    </Box>
                </Box>

            </Paper>
        </Container>
    );
}