import { useForm } from "react-hook-form";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { notify } from "../../../Utils/Notify";
import "./Register.css";

export function Register() {

    // Initializing react-hook-form for user registration data:
    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    // Handling the registration process:
    async function send(user: UserModel) {
        try {
            // Register user and update global state via user service:
            await userService.register(user);
            notify.success(`Welcome ${user.firstName} ${user.lastName}`);
            
            // Redirecting to vacations page after successful registration:
            navigate("/vacations"); 
        }
        catch (error: any) {
            notify.error(error);
        }
    }

    return (
        <div className="Register">

            <Typography variant="h4" className="FormTitle">
                Create Account
            </Typography>

            {/* Form submission using handleSubmit from react-hook-form: */}
            <form onSubmit={handleSubmit(send)}>

                <div className="NameRow">
                    {/* First name input with validation: */}
                    <TextField 
                        label="First Name" 
                        variant="outlined"
                        className="CustomTextField"
                        fullWidth 
                        {...register("firstName", {
                            required: "Missing first name",
                            minLength: { value: 2, message: "Name too short" }
                        })} 
                        error={Boolean(formState.errors.firstName)}
                        helperText={formState.errors.firstName?.message}
                    />

                    {/* Last name input with validation: */}
                    <TextField 
                        label="Last Name" 
                        variant="outlined"
                        className="CustomTextField"
                        fullWidth 
                        {...register("lastName", {
                            required: "Missing last name",
                            minLength: { value: 2, message: "Last name too short" }
                        })} 
                        error={Boolean(formState.errors.lastName)}
                        helperText={formState.errors.lastName?.message}
                    />
                </div>

                {/* Email input with regex pattern validation: */}
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

                {/* Password input with length constraints: */}
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

                {/* Registration trigger button: */}
                <Button 
                    className="SubmitBtn" 
                    variant="contained" 
                    fullWidth 
                    type="submit"
                >
                    Register
                </Button>
                
            </form>

        </div>
    );
}