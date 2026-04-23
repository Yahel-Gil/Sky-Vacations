import joi from "joi";
import { ValidationError } from "./errors";

export class CredentialsModel {

    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    // Validation schema using Joi:
    private static schema = joi.object({
        email: joi.string().required().min(5).max(100).email(),
        password: joi.string().required().min(4).max(30),
    });

    // Validate the current object:
    public validate(): void {
        const result = CredentialsModel.schema.validate(this);
        if (result.error) {
            throw new ValidationError(result.error.message);
        }
    }
}