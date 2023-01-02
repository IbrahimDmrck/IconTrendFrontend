import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { kongreImage } from '../models/entities/kongre-image';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class KongreImageService {
private ApiURL="https://localhost:44320/api/KongreImages/";
  constructor(private httpClient:HttpClient) { }

  getImagePath(imagePath:String){
    return this.ApiURL+imagePath;
  }

  uploadImage(image:File,kongreId:number):Observable<ResponseModel>{
    let newpPath=this.ApiURL+"add";
    const sendForm=new FormData();
    sendForm.append('kongreId',JSON.stringify(kongreId))
    sendForm.append('kongreImage',image,image.name)
    return this.httpClient.post<ResponseModel>(newpPath,sendForm);
  }

  deleteImage(kongreImage:kongreImage):Observable<ResponseModel>{
    let newpPath=this.ApiURL+'delete';
    return this.httpClient.post<ResponseModel>(newpPath,kongreImage);
  }
}


