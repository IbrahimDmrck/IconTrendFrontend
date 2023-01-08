import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Save } from '../models/entities/save';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  private ApiUrl="https://localhost:44320/api/Saves/";
  constructor(private httpClient:HttpClient) { }

  add(save:Save):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPaht,save);
  }

  delete(save:Save):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPaht,save);
  }

  update(save:Save):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPaht,save)
  }

  getSaveById(saveId:number):Observable<SingleResponseModel<Save>>{
    let newPaht=this.ApiUrl+"getbyid?id="+saveId;
    return this.httpClient.get<SingleResponseModel<Save>>(newPaht);
  }

  getSave():Observable<ListResponseModel<Save>>{
    let newPaht=this.ApiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Save>>(newPaht);
  }


}
