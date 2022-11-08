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
private apiUrl="https://localhost:44320/";
  constructor(private httpClient:HttpClient) { }

  getImagePath(imagePath:string){
    return this.apiUrl+imagePath;
  }

  getCongressImagesByCongressId(congressId:number):Observable<ListResponseModel<CongressImage>>{
    let newPath=this.apiUrl+"api/CongressImageses/getallbycongressid?congressId="+congressId;
    return this.httpClient.get<ListResponseModel<CongressImage>>(newPath);
  }

  uploadImage(image:File,congressId:number):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'api/CongressImageses/add';
    const sendForm=new FormData();
    sendForm.append('congressId',JSON.stringify(congressId))
    sendForm.append('congressImage',image,image.name)
    return this.httpClient.post<ResponseModel>(newPaht,sendForm);
  }

  deleteImage(congressImage:CongressImage):Observable<ResponseModel>{
    let newPath=this.apiUrl+'api/CongressImageses/delete';
    return this.httpClient.post<ResponseModel>(newPath,congressImage);
  }
}
