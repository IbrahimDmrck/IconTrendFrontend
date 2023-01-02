import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from '../models/entities/announcement';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
private apiUrl="https://localhost:44320/api/Announcements/";

  constructor(private httpClient:HttpClient) { }

  getAnnouncements():Observable<ListResponseModel<Announcement>>{
    let newPath=this.apiUrl+'getall';
    return this.httpClient.get<ListResponseModel<Announcement>>(newPath);
  }

  getAnnouncementById(announcementId:number):Observable<SingleResponseModel<Announcement>>{
    let newPath=this.apiUrl+'getbyid?id='+announcementId;
    return this.httpClient.get<SingleResponseModel<Announcement>>(newPath);
  }

  add(announcement:Announcement):Observable<SingleResponseModel<number>>{
    let newPaht=this.apiUrl+'add';
    return this.httpClient.post<SingleResponseModel<number>>(newPaht,announcement);
  }

  delete(announcement:Announcement):Observable<ResponseModel>{
    let newPath=this.apiUrl+'delete';
    return this.httpClient.post<ResponseModel>(newPath,announcement);
  }

  update(announcement:Announcement):Observable<ResponseModel>{
    let newPath=this.apiUrl+'update';
    return this.httpClient.post<ResponseModel>(newPath,announcement);
  }

  getAnnouncementsWithDetails():Observable<ListResponseModel<Announcement>>{
let newPaht=this.apiUrl+'getannouncementswithdetails';
return this.httpClient.get<ListResponseModel<Announcement>>(newPaht);
  }
}
