import joi from "joi";
import { ValidationError } from "./errors";

export class LikeModel {
    public userId: number;
    public vacationId: number;

    public constructor(like: any) {
        this.userId = like.userId;
        this.vacationId = like.vacationId;
    }

    private static validationSchema = joi.object({
        userId: joi.number().required().positive().integer(),
        vacationId: joi.number().required().positive().integer()
    });

    public validate(): void {
        const result = LikeModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}