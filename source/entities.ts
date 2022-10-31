import { Request } from 'express';
import { AppError, Role } from "./enums";

export interface guildObject {
    id: number;
    name: string;
    description: string;
    strengh: number;
}

export interface systemError {
    code: number;
    message: string;
}

export interface playerObject extends entityWithId {
    name: string;
    rating: number;
    guild: number;
}
export interface entityWithId {
    id: number;
}
export interface systemError {
    key: AppError;
    code: number;
    message: string;
}

export interface sqlParameter {
    name: string;
    type: any;
    value: string | number;
}

export interface authenticationToken {
    userData: jwtUserData;
}

export interface jwtUserData {
    userId: number;
    roleId: Role;
}

export interface AuthenticatedRequest extends Request, authenticationToken { }

export interface user extends entityWithId {
    firstName: string;
    lastName: string;
    login?: string;
    password?: string;
}