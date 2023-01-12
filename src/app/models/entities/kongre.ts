import { kongreImage } from "./kongre-image";

export class Kongre{
    kongreId:number;
    kongreBaskani:string;
    kongreDuzenlemeKurulu:string;
    bilimKurulu:string;
    kongreKonusu:string;
    kongreAdi:string;
    kongreHakkinda:string;
    kongreAdresi:string;
    kongreTarihi:Date;
    kongreBitisTarihi:Date;
    kongreImages:kongreImage[];
}