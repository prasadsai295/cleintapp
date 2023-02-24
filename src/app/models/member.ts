import { Photo } from "./photo";

export interface Member {
    id: number;
    userName: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActivity: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    intersets?: any;
    city: string;
    country: string;
    photos: Photo[];
}