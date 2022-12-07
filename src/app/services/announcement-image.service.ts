import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnounceImage } from '../models/entities/announce-image';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementImageService {
  private apiUrl="https://localhost:44320/";
  constructor(private httpClient:HttpClient) { }

  getImagePath(imagePath:String){
    return this.apiUrl+imagePath;
  }
  
  getAnnounceImagesByAnnounceId(announceId:number):Observable<ListResponseModel<AnnounceImage>>{
    let newPaht=this.apiUrl+"api/AnnounceImages/getallbyannounceid?announceId="+announceId;
    return this.httpClient.get<ListResponseModel<AnnounceImage>>(newPaht);
  }

  uploadImage(image:File,announceId:number):Observable<ResponseModel>{
    let newpPath=this.apiUrl+"api/AnnounceImages/add";
    const sendForm=new FormData();
    sendForm.append('announceId',JSON.stringify(announceId))
    sendForm.append('announceImage',image,image.name)
    return this.httpClient.post<ResponseModel>(newpPath,sendForm);
  }

  deleteImage(announceImage:AnnounceImage):Observable<ResponseModel>{
    let newpPath=this.apiUrl+'api/AnnounceImages/delete';
    return this.httpClient.post<ResponseModel>(newpPath,announceImage);
  }

}
