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
    congressStatus:boolean;
    topics:Topic[];
    regulatoryBoards:RegulatoryBoard[];
    scienceBoards:ScienceBoard[];
    congressImages:CongressImage[];
}