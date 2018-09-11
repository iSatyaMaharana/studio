import { ServerResponse } from "../../../core/server/core.server-response";

export interface User {
    _id: string | null;
    firstName:string;
    lastName:string;
    email: string;
    mobile: string;
    password:string;
    confirmPassword:string;
}

export interface UserResponse extends ServerResponse {
    results : User[];       
    resultCount: number;
}
