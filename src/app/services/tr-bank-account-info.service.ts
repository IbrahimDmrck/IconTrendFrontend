import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrBankAccountInfo } from '../models/entities/tr-bank-account-info';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class TrBankAccountInfoService {
private ApiUrl="https://localhost:44320/api/TrBankAccountInfos/";
  constructor(private httpClient:HttpClient) { }

  add(trBank:TrBankAccountInfo):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPaht,trBank);
  }

  delete(trBank:TrBankAccountInfo):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPaht,trBank);
  }

  update(trBank:TrBankAccountInfo):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPaht,trBank)
  }

  getTrBankAccountById(trBankId:number):Observable<SingleResponseModel<TrBankAccountInfo>>{
    let newPaht=this.ApiUrl+"getbyid?id="+trBankId;
    return this.httpClient.get<SingleResponseModel<TrBankAccountInfo>>(newPaht);
  }

  getTrBankAccount():Observable<ListResponseModel<TrBankAccountInfo>>{
    let newPaht=this.ApiUrl+"getall";
    return this.httpClient.get<ListResponseModel<TrBankAccountInfo>>(newPaht);
  }

}
