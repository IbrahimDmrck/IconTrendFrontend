import { CongressImage } from "./congress-image";
import { RegulatoryBoard } from "./regulatory-board";
import { ScienceBoard } from "./science-board";
import { Topic } from "./topic";

export interface Congress{
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