export class VacationModel {
    public id?: number; 
    public destination?: string; 
    public description?: string; 
    public startDate?: string; 
    public endDate?: string; 
    public price?: number; 
    public imageName?: string; 
    public image?: File;
    
    // Logic fields from SQL:
    public isLiked?: boolean; 
    public likesCount?: number; // Total number of likes

    // UI helper:
    public imageUrl?: string; // Full URL for <img> tag
}