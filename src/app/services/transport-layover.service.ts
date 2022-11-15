import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportLayover } from '../models/entities/transport-layover';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class TransportLayoverService {

  private apiURL="https://localhost:44320/api/TransportLayovers/";
  constructor(private httpClient:HttpClient) { }

  getTransportLayovers():Observable<ListResponseModel<TransportLayover>>{
    let newPath =this.apiURL+'getall';
    return this.httpClient.get<ListResponseModel<TransportLayover>>(newPath);
  }

  getTransportLayoverById(transportLayoverId:number):Observable<SingleResponseModel<TransportLayover>>{
    let newPaht = this.apiURL+'getbyid?id='+transportLayoverId;
    return this.httpClient.get<SingleResponseModel<TransportLayover>>(newPaht);
  }

  add(transportLayover:TransportLayover):Observable<SingleResponseModel<number>>{
    let newPath=this.apiURL+'add';
    return this.httpClient.post<SingleResponseModel<number>>(newPath,transportLayover);
  }

  delete(transportLayover:TransportLayover):Observable<ResponseModel>{
    let newPath=this.apiURL+'delete';
    return this.httpClient.post<ResponseModel>(newPath,transportLayover);
  }

  update(transportLayover:TransportLayover):Observable<ResponseModel>{
    let newPaht=this.apiURL+'update';
    return this.httpClient.post<ResponseModel>(newPaht,transportLayover);
  }
}
