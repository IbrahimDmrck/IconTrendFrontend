import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccountInfo } from '../models/entities/bank-account-info';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BankAccountInfoService {
private ApiUrl="https://localhost:44320/api/BankAccountInfos/";
  constructor(private httpClient:HttpClient) { }

  add(bankAccount:BankAccountInfo):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPaht,bankAccount);
  }

  delete(bankAccount:BankAccountInfo):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPaht,bankAccount);
  }

  update(bankAccount:BankAccountInfo):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPaht,bankAccount)
  }

  getBankAccountById(bankAccountId:number):Observable<SingleResponseModel<BankAccountInfo>>{
    let newPaht=this.ApiUrl+"getbyid?id="+bankAccountId;
    return this.httpClient.get<SingleResponseModel<BankAccountInfo>>(newPaht);
  }

  getBankAccount():Observable<ListResponseModel<BankAccountInfo>>{
    let newPaht=this.ApiUrl+"getall";
    return this.httpClient.get<ListResponseModel<BankAccountInfo>>(newPaht);
  }
}
