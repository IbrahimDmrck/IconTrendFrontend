import { AnnounceImage } from "./announce-image";

export class Announcement{
    id:number;
    announceTitle:string;
    announceContent:string;
    announceStatus:boolean;
    announceDate:Date;
    announceImages:AnnounceImage[];
}