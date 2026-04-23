import axios, { InternalAxiosRequestConfig } from "axios";

class Interceptor {

	public create(): void {
        
        // Before each request:
          axios.interceptors.request.use((httpRequest: InternalAxiosRequestConfig)=>{


            //Take token:
            const token = localStorage.getItem("token");

            //Send in header:
            if(token){
                httpRequest.headers.Authorization = "Bearer " + token;
            }
            
            //Return:
            return httpRequest;

          });
    }
}

export const interceptor = new Interceptor();
