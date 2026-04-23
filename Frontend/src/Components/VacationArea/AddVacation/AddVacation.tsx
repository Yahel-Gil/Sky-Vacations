import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper, Container, IconButton } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { useState } from "react";
import "./AddVacation.css"; 

export function AddVacation() {

    // Setup form with React Hook Form:
    const { register, handleSubmit, watch, formState: { errors } } = useForm<VacationModel>();
    const navigate = useNavigate();
    
    // State for image preview before uploading:
    const [imageUrl, setImageUrl] = useState<string>("");

    // Watch start date for end date dynamic validation:
    const startDateValue = watch("startDate");

    // Handle dynamic image preview:
    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            // Using fileEvent to represent the reading completion event:
            reader.onload = (fileEvent) => setImageUrl(fileEvent.target?.result as string);
            reader.readAsDataURL(file);
        }
    }

    // Add new vacation logic:
    async function send(vacation: VacationModel) {
        try {
            // Validate image existence (Mandatory for new vacations):
            const files = vacation.image as unknown as FileList;
            if (!files || files.length === 0) {
                notify.error("Please upload an image.");
                return;
            }
            
            vacation.image = files[0];
            await vacationsService.addVacation(vacation);
            notify.success("New vacation added! 🏖️");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <Container maxWidth="sm" className="add-container-wrapper">
            
            <Paper elevation={0} className="AddPaper">
                
                {/* Back button integrated inside the card: */}
                <IconButton onClick={() => navigate("/vacations")} className="add-back-btn-inside">
                    <ArrowBackIcon />
                </IconButton>

                <Typography variant="h4" className="add-main-title">
                    Add New Destination
                </Typography>

                <form onSubmit={handleSubmit(send)}>
                    
                    <TextField 
                        fullWidth label="Destination" className="add-text-field"
                        {...register("destination", { 
                            required: "Destination is required",
                            minLength: { value: 2, message: "Destination must be at least 2 characters long" }
                         })}
                        error={!!errors.destination} 
                        helperText={errors.destination?.message}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />

                    <TextField 
                        fullWidth label="Description" multiline rows={3} className="add-text-field"
                        {...register("description", {
                                required: "Description is required",
                                minLength: { value: 10, message: "Description must be at least 10 characters long" }
                             })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />

                    <Box className="add-date-group">
                        <TextField 
                            fullWidth type="date" label="Start Date" className="add-text-field"
                            {...register("startDate", { required: "Required" })}
                            error={!!errors.startDate}
                            slotProps={{ 
                                inputLabel: { shrink: true },
                                // Strict validation: Only future dates for NEW vacations:
                                htmlInput: { min: new Date().toISOString().split("T")[0] } 
                            }}
                        />
                        <TextField 
                            fullWidth type="date" label="End Date" className="add-text-field"
                            {...register("endDate", { required: "Required" })}
                            error={!!errors.endDate}
                            slotProps={{ 
                                inputLabel: { shrink: true },
                                htmlInput: { min: startDateValue || new Date().toISOString().split("T")[0] } 
                            }}
                        />
                    </Box>

                    <TextField 
                        fullWidth type="number" label="Price ($)" className="add-text-field"
                        {...register("price", { 
                            required: "Price is required", 
                            min: { value: 0, message: "Min 0" },
                            max: { value: 10000, message: "Max 10,000" }
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />

                    <Box className="image-add-section">
                        {/* Show preview frame only if image is selected: */}
                        {imageUrl && (
                            <div className="preview-image-container">
                                <img src={imageUrl} alt="preview" className="add-preview-img" />
                            </div>
                        )}
                        
                        <Button 
                            variant="outlined" 
                            component="label" 
                            startIcon={<CloudUploadIcon />} 
                            fullWidth 
                            className={`add-upload-btn ${!imageUrl && errors.image ? "upload-error" : ""}`}
                        >
                            Upload Vacation Image *
                            <input 
                                type="file" 
                                hidden 
                                accept="image/*" 
                                {...register("image", { 
                                    required: "Image is mandatory",
                                    onChange: (event) => handleImageChange(event) 
                                })} 
                            />
                        </Button>
                        {errors.image && <Typography className="error-caption">Image is required</Typography>}
                    </Box>

                    <Button fullWidth variant="contained" type="submit" size="large" className="save-button">
                        Create Vacation
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}