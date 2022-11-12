import { CongressImage } from "./congress-image";

export interface CongressDetailDto{
    congressId:number;
    congressName:string;
    congressPresidentId:number;
    congressPresidentName:string;
    congressAbout:string;
    congressCity:string;
    congressPlace:string;
    congressDate:Date;
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