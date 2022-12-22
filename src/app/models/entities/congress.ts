import { CongressImage } from "./congress-image";

export class Congress{
    congressId:number;
    congressName:string;
    congressPresidentName:string;
    congressAbout:string;
    congressAdress:string;
    congressDate:Date;
    congressStatus:boolean;
    topic:string;
    scienceBoard:string;
    regulatoryBoard:string;
    univercity:string;
    congressImages:CongressImage[];
}