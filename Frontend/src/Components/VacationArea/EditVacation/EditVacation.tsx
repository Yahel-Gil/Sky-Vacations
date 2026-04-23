import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper, Container, IconButton } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { appConfig } from "../../../Utils/AppConfig";
import "./EditVacation.css";

export function EditVacation() {

    // Setup form with React Hook Form:
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<VacationModel>();
    
    const navigate = useNavigate();
    const { id } = useParams();
    const vacationId = Number(id);

    // State for image preview and data loading status:
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    // Watch start date to enforce end date validation:
    const startDateValue = watch("startDate");

    // Load existing vacation from backend:
    useEffect(() => {
        vacationsService.getOneVacation(vacationId)
            .then(vacation => {
                // Populate form fields:
                setValue("id", vacation.id);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate?.substring(0, 10)); // Extract date only
                setValue("endDate", vacation.endDate?.substring(0, 10));
                setValue("price", vacation.price);
                
                // Set initial image preview:
                setImageUrl(appConfig.imagesUrl + vacation.imageName);
                setIsLoaded(true); 
            })
            .catch(err => notify.error(err));
    }, [vacationId, setValue]);

    // Handle dynamic image preview:
    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            // Use event to capture the result after reading:
            reader.onload = (fileEvent) => setImageUrl(fileEvent.target?.result as string);
            reader.readAsDataURL(file);
        }
    }

    // Submit the updated data:
    async function send(vacation: VacationModel) {
        try {
            vacation.id = vacationId;

            // Extract file from FileList:
            const files = vacation.image as unknown as FileList;
            if (files && files.length > 0) {
                vacation.image = files[0];
            } else {
                // Maintain existing image if no new file is uploaded:
                vacation.image = undefined;
            }

            await vacationsService.updateVacation(vacation);
            notify.success("Vacation updated successfully! ✈️");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    if (!isLoaded) return null;

    return (
        <Container maxWidth="sm" className="edit-container-wrapper">
            
            <Paper elevation={0} className="EditPaper">
                
                {/* Back button integrated inside the card: */}
                <IconButton onClick={() => navigate("/vacations")} className="edit-back-btn-inside">
                    <ArrowBackIcon />
                </IconButton>

                <Typography variant="h4" className="edit-main-title">
                    Edit Destination
                </Typography>

                <form onSubmit={handleSubmit(send)}>
                    
                    <TextField 
                        fullWidth label="Destination" className="edit-text-field"
                        {...register("destination", { 
                            required: "Destination is required",
                            minLength: { value: 2, message: "Destination must be at least 2 characters long" }
                        })}
                        error={!!errors.destination} 
                        helperText={errors.destination?.message}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />

                    <TextField 
                        fullWidth label="Description" multiline rows={3} className="edit-text-field"
                        {...register("description", { 
                            required: "Description is required",
                            minLength: { value: 10, message: "Description must be at least 10 characters long" }
                         })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />

                    <Box className="edit-date-group">
                        <TextField 
                            fullWidth type="date" label="Start Date" className="edit-text-field"
                            {...register("startDate", { required: "Required" })}
                            error={!!errors.startDate}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField 
                            fullWidth type="date" label="End Date" className="edit-text-field"
                            {...register("endDate", { required: "Required" })}
                            error={!!errors.endDate}
                            slotProps={{ 
                                inputLabel: { shrink: true },
                                htmlInput: { min: startDateValue } 
                            }}
                        />
                    </Box>

                    <TextField 
                        fullWidth type="number" label="Price ($)" className="edit-text-field"
                        {...register("price", { 
                            required: "Price is required", 
                            min: { value: 0, message: "Min 0" },
                            max: { value: 10000, message: "Max 10,000" }
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />

                    <Box className="image-edit-section">
                        <div className="preview-image-container">
                            <img src={imageUrl} alt="preview" className="edit-preview-img" />
                        </div>
                        
                        <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} fullWidth className="edit-upload-btn">
                            Update Image
                            <input 
                                type="file" 
                                hidden 
                                accept="image/*" 
                                {...register("image", {
                                    onChange: (event) => handleImageChange(event)
                                })} 
                            />
                        </Button>
                    </Box>

                    <Button fullWidth variant="contained" type="submit" size="large" className="save-button">
                        Update Vacation
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}