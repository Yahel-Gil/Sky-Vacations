import joi from "joi";
import { ValidationError } from "./errors";
import { UploadedFile } from "express-fileupload";

export class VacationModel {
    public id: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;
    public imageUrl: string;
    
    public isLiked: boolean; 
    public likesCount: number;

    public constructor(vacation: VacationModel) { 
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.imageUrl = vacation.imageUrl;
        this.isLiked = vacation.isLiked;
        this.likesCount = vacation.likesCount;
    }
    

    // Schema for adding a new vacation:
    private static insertSchema = joi.object({
        id: joi.number().forbidden(), 
        destination: joi.string().required().min(2).max(45),
        description: joi.string().required().min(10).max(1000),
        startDate: joi.date().iso().min(new Date().toISOString().split('T')[0]).required(), // Future dates only, include today
        endDate: joi.date().required().greater(joi.ref('startDate')),
        price: joi.number().required().min(0).max(10000),
        imageName: joi.string().optional().max(50),
        imageUrl: joi.string().optional(),
        image: joi.any().required(), // Image is mandatory for new vacations
        isLiked: joi.boolean().optional(),
        likesCount: joi.number().optional().min(0)
    });

    // Schema for updating an existing vacation:
    private static updateSchema = joi.object({
        id: joi.number().required().positive().integer(),
        destination: joi.string().required().min(2).max(45),
        description: joi.string().required().min(10).max(1000),
        startDate: joi.date().required(), // Past dates allowed for editing
        endDate: joi.date().required().greater(joi.ref('startDate')),
        price: joi.number().required().min(0).max(10000),
        imageName: joi.string().optional().max(50),
        imageUrl: joi.string().optional(),
        image: joi.any().optional(), // Image is optional for editing
        isLiked: joi.boolean().optional(),
        likesCount: joi.number().optional().min(0)
    });

    public validateInsert(): void {
        const result = VacationModel.insertSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public validateUpdate(): void {
        const result = VacationModel.updateSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}