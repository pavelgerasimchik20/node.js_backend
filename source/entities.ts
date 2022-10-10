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

export interface playerObject {
    id: number;
    name: string;
    rating: number;
    guild: number;
}