import { useForm } from "react-hook-form";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { userService } from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { notify } from "../../../Utils/Notify";
import "./Login.css";

export function Login() {

    // Initializing react-hook-form for credentials management:
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    // Send login credentials to the server:
    async function send(credentials: CredentialsModel) {
        try {
            // Attempting login via user service:
            await userService.login(credentials);
            notify.success("Welcome back!");
            
            // Redirecting user to vacations page on success:
            navigate("/vacations");
        }
        catch (error: any) {
            notify.error(error);
        }
    }

    return (
        <div className="Login">
            
            <Typography variant="h4" className="FormTitle">
                Login
            </Typography>
            
            {/* Handling form submission using react-hook-form: */}
            <form onSubmit={handleSubmit(send)}>

                {/* Email input with validation rules: */}
                <TextField 
                    label="Email" 
                    type="email" 
                    variant="outlined"
                    className="CustomTextField"
                    fullWidth 
                    {...register("email", { 
                        required: "Missing email",
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Invalid email format"
                        }
                    })} 
                    error={Boolean(formState.errors.email)}
                    helperText={formState.errors.email?.message}
                />

                {/* Password input with min length validation: */}
                <TextField 
                    label="Password" 
                    type="password" 
                    variant="outlined"
                    className="CustomTextField"
                    fullWidth 
                    {...register("password", { 
                        required: "Missing password",
                        minLength: { value: 4, message: "Password must be at least 4 characters" }
                    })} 
                    error={Boolean(formState.errors.password)}
                    helperText={formState.errors.password?.message}
                />

                {/* Submit button to trigger login: */}
                <Button 
                    className="SubmitBtn" 
                    variant="contained" 
                    fullWidth 
                    type="submit"
                >
                    Login
                </Button>

            </form>
        </div>
    );
}