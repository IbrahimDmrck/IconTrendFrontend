import { TransportLayoverImage } from "./transport-layover-image";

export class TransportLayover{
    transportId:number;
    capacity:number;
    minDemand:string;
    price:number;
    description:string;
    transportLayoverImages:TransportLayoverImage[];
}