import { CongressImage } from "./congress-image";

export interface Congress{
    congressId:number;
    congressName:string;
    congressPresidentId:number;
    congressPresidentName:string;
    congressAbout:string;
    congressCity:string;
    congressPlace:string;
    congressDate:Date;
    congressStatus:boolean;
    topicId:number;
    topicName:string;
    scienceBoardId:number;
    scienceBoardMemberName:string;
    regulatoryBoardId:number;
    regulatoryBoardMemberName:string;
    regulatoryBoardMemberUnivercity:string;
    scienceBoardMemberUnivercity:string;
    congressImages:CongressImage[];
}