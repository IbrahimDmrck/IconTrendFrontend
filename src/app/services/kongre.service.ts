import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kongre } from '../models/entities/kongre';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class KongreService {
private ApiURL="https://localhost:44320/api/Kongres/";
  constructor(private httpClient:HttpClient) { }

  add(kongre:Kongre):Observable<SingleResponseModel<number>>{
    let newPaht=this.ApiURL+'add';
    return this.httpClient.post<SingleResponseModel<number>>(newPaht,kongre);
  }

  delete(kongre:Kongre):Observable<ResponseModel>{
    let newPath=this.ApiURL+'delete';
    return this.httpClient.post<ResponseModel>(newPath,kongre);
  }

  update(kongre:Kongre):Observable<ResponseModel>{
    let newPath=this.ApiURL+'update';
    return this.httpClient.post<ResponseModel>(newPath,kongre);
  }

  getKongre():Observable<ListResponseModel<Kongre>>{
    let newPath=this.ApiURL+'getall';
    return this.httpClient.get<ListResponseModel<Kongre>>(newPath);
  }

  getKongreById(kongreId:number):Observable<SingleResponseModel<Kongre>>{
    let newPath=this.ApiURL+'getbyid?id='+kongreId;
    return this.httpClient.get<SingleResponseModel<Kongre>>(newPath);
  }

  getKongreDetails(kongreId:number):Observable<SingleResponseModel<Kongre>>{
    let newPaht=this.ApiURL+'getkongresdetails?kongreId='+kongreId;
    return this.httpClient.get<SingleResponseModel<Kongre>>(newPaht);
  }




}
