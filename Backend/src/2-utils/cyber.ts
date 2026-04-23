import { SignOptions } from "jsonwebtoken";
import { UserModel } from "../3-models/user-model";
import jwt from "jsonwebtoken";
import { appConfig } from "./app-config";
import { Role } from "../3-models/enums";
import crypto from "crypto";
import { Request } from "express";

// util for login and register:

class Cyber {

    // Hashing password with the Salt from your .env:

    public hash(plainText: string): string {

        // hmac: hash-based message authentication code
        const hashText = crypto.createHmac("sha512", appConfig.hashSalt).update(plainText).digest("hex");
        return hashText;
    }

    // Generate JWT token for Login / Register:
    public generateToken(user: UserModel): string {

        // Important: Remove password from user object before signing the token:
        delete(user as any).password;

        // Create the data payload:
        const payload = { user };

        // Token duration (3 hours):
        const options: SignOptions = { expiresIn: "3h" };

        // Sign and return the token:
        const token = jwt.sign(payload, appConfig.jwtSecret, options);

        return token;
    }

    // Extract the token from the request header:
    public extractToken(request: Request): string {
        const authorization = request.headers.authorization; // "Bearer [token]"
        if (!authorization) return "";
        const token = authorization.substring(7);
        return token;
    }

    // Basic verification of the token (Is it legal? Is it expired?):
    public verifyToken(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecret);
            return true;
        }
        catch (err: any) {
            return false;
        }
    }

    // Advanced verification for Admin:
    public verifyAdmin(token: string): boolean {
        try {
            if (!token) return false;
            
            // Verify integrity and expiration:
            jwt.verify(token, appConfig.jwtSecret);
            
            // Decode and check roleId:
            const payload = jwt.decode(token) as { user: UserModel };
            const user = payload.user;
            
            return user.roleId === Role.Admin;
        }
        catch (err: any) {
            return false;
        }
    }

    // Helper to get user ID for the Likes table:
    public getTokenUserId(token: string): number {
        try {
            const payload = jwt.decode(token) as { user: UserModel };
            const user = payload.user;
            return user.id;
        }
        catch {
            return 0;
        }
    }

    // Get user object from request token:
    public getUserFromToken(request: Request): UserModel {
        const token = this.extractToken(request);
        const payload = jwt.decode(token) as { user: UserModel };
        const user = payload.user;
        return user;
}
}

export const cyber = new Cyber();