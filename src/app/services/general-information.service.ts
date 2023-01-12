import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralInformation } from '../models/entities/general-information';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class GeneralInformationService {
  private ApiUrl="https://localhost:44320/api/GeneralInformations/";
  constructor(private httpClient:HttpClient) { }

  add(generalInfo:GeneralInformation):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPaht,generalInfo);
  }

  delete(generalInfo:GeneralInformation):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPaht,generalInfo);
  }

  update(generalInfo:GeneralInformation):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPaht,generalInfo)
  }

  getGeneralInfoById(generalInfoId:number):Observable<SingleResponseModel<GeneralInformation>>{
    let newPaht=this.ApiUrl+"getbyid?id="+generalInfoId;
    return this.httpClient.get<SingleResponseModel<GeneralInformation>>(newPaht);
  }

  getGeneralInfo():Observable<ListResponseModel<GeneralInformation>>{
    let newPaht=this.ApiUrl+"getall";
    return this.httpClient.get<ListResponseModel<GeneralInformation>>(newPaht);
  }

}
