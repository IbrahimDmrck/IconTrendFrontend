import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportLayoverImage } from '../models/entities/transport-layover-image';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TransportLayoverImageService {
  private apiUrl="https://localhost:44320/api/TransportLayoverImageses/"
  constructor(private httpClient:HttpClient) { }

  getImagePath(imagePath:string){
    return this.apiUrl+imagePath;
  }

  uploadImage(image:File,transportId:number):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'add';
    const sendForm=new FormData();
    sendForm.append('transportId',JSON.stringify(transportId))
    sendForm.append('transportImage',image,image.name)
    return this.httpClient.post<ResponseModel>(newPaht,sendForm);
  }

  deleteImage(transportLayoverImage:TransportLayoverImage):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'delete';
    return this.httpClient.post<ResponseModel>(newPaht,transportLayoverImage);
  }

}
