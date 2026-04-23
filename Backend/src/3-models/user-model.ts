import joi from "joi";
import { Role } from "./enums";
import { ValidationError } from "./errors";

export class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: Role;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    private static validationSchema = joi.object({
        id: joi.number().optional().positive().integer(),
        firstName: joi.string().required().min(2).max(45),
        lastName: joi.string().required().min(2).max(45),
        email: joi.string().required().email().max(45),
        password: joi.string().required().min(4).max(128), 
        roleId: joi.number().optional().integer()
    });

    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}