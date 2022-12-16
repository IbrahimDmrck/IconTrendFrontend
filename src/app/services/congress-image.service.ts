import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CongressImage } from '../models/entities/congress-image';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { CongressService } from './congress.service';

@Injectable({
  providedIn: 'root'
})
export class CongressImageService {
private apiUrl="https://localhost:44320/api/AnnounceImages/";
  constructor(private httpClient:HttpClient) { }

  getImagePath(imagePath:string){
    return this.apiUrl+imagePath;
  }

 

  uploadImage(image:File,congressId:number):Observable<ResponseModel>{
    let newpPath=this.apiUrl+"add";
    const sendForm=new FormData();
    sendForm.append('congressId',JSON.stringify(congressId))
    sendForm.append('congressImage',image,image.name)
    return this.httpClient.post<ResponseModel>(newpPath,sendForm);
  }

  deleteImage(congressImage:CongressImage):Observable<ResponseModel>{
    let newPath=this.apiUrl+'api/CongressImageses/delete';
    return this.httpClient.post<ResponseModel>(newPath,congressImage);
  }
}
