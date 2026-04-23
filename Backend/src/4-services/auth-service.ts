import { OkPacketParams } from 'mysql2';
import { Role } from '../3-models/enums';
import { UserModel } from '../3-models/user-model';
import { dal } from '../2-utils/dal';
import { cyber } from '../2-utils/cyber';
import { CredentialsModel } from '../3-models/credentials-model';
import { ResourceNotFoundError, UnauthorizedError, ValidationError } from '../3-models/errors';

class AuthService {

    // Check if the email is already exist in database:
    private async verifyFreeEmail(email: string): Promise<void> {
        const sql = "select * from users where email = ?";
        const values = [email];
        const users = await dal.execute(sql, values) as UserModel[];
        if (users.length > 0) throw new ValidationError("Email already taken.");
    }

    // Register a new user:
    public async register(user: UserModel): Promise<string> {

        // Validation:
        user.validate();
        await this.verifyFreeEmail(user.email);

        // Hash password:
        user.password = cyber.hash(user.password);

        // Set default role:
        user.roleId = Role.User;

        // Create sql:
        const sql = "insert into users(firstName, lastName, email, password, roleId) values(?,?,?,?,?)";
        const values = [user.firstName, user.lastName, user.email, user.password, user.roleId];

        // Execute:
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        user.id = info.insertId!;

        // Generate token:
        const token = cyber.generateToken(user);
        return token;
    }

    // Login: 
    public async login(credentials: CredentialsModel): Promise<string> {

        // Validate:
        credentials.validate();

        // Hash password:
        credentials.password = cyber.hash(credentials.password);

        // Create sql:
        const sql = "select * from users where email = ? and password = ?";
        const values = [credentials.email, credentials.password];
        
        // Execute:
        const users = await dal.execute(sql, values) as UserModel[];

        // Extract user:
        const user = users[0];

        if (!user) throw new UnauthorizedError("Incorrect email or password");

        // Generate token:
        const token = cyber.generateToken(user);
        return token;
    }

    
    public async getOneUser(id: number): Promise<UserModel> {

        // Create sql:
        const sql = "select * from users where id = ?";
        const values = [id];

        // Execute:
        const users = await dal.execute(sql, values) as UserModel[];

        // Extract user:
        const user = users[0];

        // If no such user:
        if (!user) throw new ResourceNotFoundError(id);

        // Remove password before returning:
        delete (user as any).password;

        return user;
    }

}

export const authService = new AuthService();