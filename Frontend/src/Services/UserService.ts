import axios from "axios";
import { UserModel } from "../Models/UserModel";
import { appConfig } from "../Utils/AppConfig";
import { jwtDecode } from "jwt-decode";
import { CredentialsModel } from "../Models/CredentialsModel";
import { userSlice } from "../Redux/UserSlice";
import { store } from "../Redux/Store";

class UserService {

    //restore user from storage if exist:
    public constructor() {

        //load token from storage:
        const token = localStorage.getItem("token");
        if(token) {
            const container = jwtDecode<{ user: UserModel }>(token);
            const dbUser = container.user;
            const action = userSlice.actions.initUser(dbUser);
            store.dispatch(action);
        }

    }
	        
    public async register(user: UserModel): Promise<void> {

        //Send user to backend:
        const response = await axios.post<string>(appConfig.registerUrl, user);
        
        //Get back token:
        const token = response.data;
        localStorage.setItem("token", token)

        //Extract user:
        const container = jwtDecode<{ user: UserModel }>(token);
        const dbUser = container.user;

        //save to global state:
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
    }


        public async login(Credentials: CredentialsModel): Promise<void> {
            
            //send credentials to backend:
            const response = await axios.post<string>(appConfig.loginUrl, Credentials);
            
            //Get back token:
            const token = response.data;
            localStorage.setItem("token", token)

            //Extract user:
            const container = jwtDecode<{ user: UserModel }>(token);
            const dbUser = container.user;

            //save to global state:
            const action = userSlice.actions.initUser(dbUser);
            store.dispatch(action);
         }


         public logOut(): void {

            //remove token from localstorage:
            localStorage.removeItem("token")

            //save to global state:
            const action = userSlice.actions.logOutUser();
            store.dispatch(action);
        }

        // Get user details:
        public async getOneUser(id: number): Promise<UserModel> {
            const response = await axios.get<UserModel>(appConfig.usersUrl + id);
            const user = response.data;
            return user;
        }

}

export const userService = new UserService();
