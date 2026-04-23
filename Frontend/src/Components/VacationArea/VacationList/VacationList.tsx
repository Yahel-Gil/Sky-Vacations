import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { VacationCard } from "../VacationCard/VacationCard";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, MenuItem, Select, Button, Typography, Paper, Pagination, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "./VacationList.css";

export function VacationList() {

    const navigate = useNavigate();
    
    // Get vacations and user from global state:
    const vacations = useSelector((state: AppState) => state.vacations);
    const user = useSelector((state: AppState) => state.user);

    // Local state for filtering and pagination:
    const [filter, setFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const vacationsPerPage = 9;

    // State for modern delete dialog:
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);

    // Load data from server on component mount:
    useEffect(() => {
        vacationsService.getAllVacations().catch(err => notify.error(err));
    }, []);

    // --- Logic Section (Display only) ---

    const now = new Date().toISOString();
    let displayed = [...vacations]; 

    // Filtering logic - determining what to show:
    if (filter === "liked") {
        displayed = displayed.filter(v => v.isLiked);
    }
    if (filter === "active") {
        displayed = displayed.filter(v => v.startDate! <= now && v.endDate! >= now);
    }
    if (filter === "upcoming") {
        displayed = displayed.filter(v => v.startDate! > now);
    }

    // Sorting logic - Ascending order by start date:
    displayed.sort((vacationA, vacationB) => {
        const timeA = new Date(vacationA.startDate!).getTime(); // Get milliseconds for first vacation
        const timeB = new Date(vacationB.startDate!).getTime(); // Get milliseconds for second vacation
        return timeA - timeB; // Subtract: negative means A is earlier
    });

    // Pagination logic - slicing the array for 9 items:
    const totalPages = Math.ceil(displayed.length / vacationsPerPage);
    const startIndex = (currentPage - 1) * vacationsPerPage;
    const currentVacations = displayed.slice(startIndex, startIndex + vacationsPerPage);

    // Bridge function for deletion - now opening the dialog:
    function openConfirmDelete(id: number) {
        setIdToDelete(id);
        setOpenDeleteDialog(true);
    }

    // Final deletion execution:
    async function deleteVacation() {
        if (!idToDelete) return;
        try {
            await vacationsService.deleteVacation(idToDelete); 
            notify.success("Vacation deleted successfully");
            setOpenDeleteDialog(false); // Close dialog on success
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <Box className="vacation-list-page">
            
            {/* Title Section */}
            <Typography variant="h3" className="list-title">
                Explore Your Next Adventure
            </Typography>

            {/* Controls Toolbar - Matching Menu/Drawer style */}
            <Paper elevation={0} className="filter-paper-toolbar">
                
                <Box className="filter-container">
                    <Typography variant="subtitle2" className="filter-text-label">
                        Filter By:
                    </Typography>
                    <FormControl variant="standard" className="select-form-control">
                        <Select
                            value={filter}
                            onChange={(event) => { 
                                const selectedValue = event.target.value; 
                                setFilter(selectedValue); 
                                setCurrentPage(1); 
                            }}
                            disableUnderline
                            className="select-input-field"
                        >
                            <MenuItem value="all">🌍 All Vacations</MenuItem>

                            {/* Only for users */}
                            {user?.roleId === 2 && <MenuItem value="liked">❤️ My Favorites</MenuItem>}

                            <MenuItem value="active">🔥 Happening Now</MenuItem>
                            <MenuItem value="upcoming">⏳ Coming Soon</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box className="actions-container">
                    <Typography variant="body2" className="results-badge">
                        {displayed.length} Destinations Found
                    </Typography>

                    {/* Only for Admin */}
                    {user?.roleId === 1 && (
                        <Button 
                            variant="contained" 
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/vacations/add")}
                            className="add-vacation-btn"
                        >
                            Add Vacation
                        </Button>
                    )}
                </Box>
            </Paper>

            {/* Grid display */}
            <Box className="vacations-grid-layout">
                {currentVacations.map(v => 
                    <VacationCard
                        key={v.id}
                        vacation={v}
                        onDelete={openConfirmDelete}
                    />
                )}
            </Box>

            {/* Pagination Section */}
            {totalPages > 1 && (
                <Box className="pagination-flex-container">
                    <Pagination 
                        count={totalPages} 
                        page={currentPage} 
                        onChange={(_event, value) => {
                            setCurrentPage(value);
                            document.querySelector(".MainContent")?.scrollTo({ top: 0, behavior: "smooth" });
                        }} 
                        className="custom-pagination-style"
                    />
                </Box>
            )}

            {/* Deletion Dialog */}
            <Dialog 
                open={openDeleteDialog} 
                onClose={() => setOpenDeleteDialog(false)}
                className="modern-dialog-root"
            >
                <DialogTitle className="dialog-header-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this vacation? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions className="dialog-actions-group">
                    <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={deleteVacation} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}