import { CongressImage } from "./congress-image";

export interface CongressDetailDto{
    congressId:number;
    congressName:string;
    congressPresidentId:number;
    congressAbout:string;
    congressCity:string;
    congressPlace:string;
    congressDate:Date;
    congressImages:CongressImage[];
}