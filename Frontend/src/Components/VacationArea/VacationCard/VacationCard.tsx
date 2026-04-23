import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Box, Tooltip } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { VacationModel } from "../../../Models/VacationModel";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { appConfig } from "../../../Utils/AppConfig";
import { useNavigate } from "react-router-dom";
import "./VacationCard.css";
import { likesService } from "../../../Services/LikesService";

interface VacationCardProps {
    vacation: VacationModel;
    onDelete: (id: number) => void;
}

export function VacationCard(props: VacationCardProps) {
    
    // Destructuring props for cleaner usage:
    const { vacation, onDelete } = props;
    
    // Accessing global user state and navigation:
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();

    // Formatting dates to a readable British format (DD/MM/YYYY):
    const startDate = new Date(vacation.startDate!).toLocaleDateString('en-GB');
    const endDate = new Date(vacation.endDate!).toLocaleDateString('en-GB');

    return (
        <Card className="PremiumVacationCard" elevation={0}>
            
            {/* Visual Header - Image & Destination Layer: */}
            <Box className="image-container">
                <CardMedia
                    component="img"
                    className="main-vacation-img"
                    image={appConfig.imagesUrl + vacation.imageName}
                    alt={vacation.destination}
                />
                
                {/* Floating Glass Price Tag displaying the cost: */}
                <div className="glass-price-tag">
                    <span className="price-val">${vacation.price}</span>
                </div>

                {/* Dark Gradient Overlay for better title visibility: */}
                <div className="image-overlay-layer">
                    <Typography variant="h4" className="card-dest-title">
                        {vacation.destination}
                    </Typography>
                </div>
            </Box>

            {/* Content Section - Dates & Description: */}
            <CardContent className="card-body-content">
                <div className="info-row">
                    <CalendarMonthIcon className="info-icon" />
                    <Typography className="date-display">
                        {startDate} — {endDate}
                    </Typography>
                </div>
                
                <Typography variant="body2" className="card-desc-text">
                    {vacation.description}
                </Typography>
            </CardContent>

            {/* Action Bar - Conditional Rendering based on user role: */}
            <CardActions disableSpacing className="card-footer-actions">
                
                {/* User Actions (RoleId 2): Like functionality: */}
                {user?.roleId === 2 && (
                    <Box className="engagement-box">
                        <IconButton 
                            onClick={() => likesService.toggleLike(vacation.id!)}
                            className={vacation.isLiked ? "heart-toggle liked" : "heart-toggle"}
                        >
                            {vacation.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Typography className="likes-label">{vacation.likesCount} Likes</Typography>
                    </Box>
                )}

                {/* Admin Actions (RoleId 1): Edit & Delete buttons: */}
                {user?.roleId === 1 && (
                    <Box className="admin-action-group">
                        <Tooltip title="Edit">
                            <IconButton onClick={() => navigate("/vacations/edit/" + vacation.id)} className="adm-btn edit-v">
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Delete">
                            {/* Triggering the delete confirm dialog from parent: */}
                            <IconButton onClick={() => onDelete(vacation.id!)} className="adm-btn delete-v">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
}