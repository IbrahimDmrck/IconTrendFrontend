import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportLayover } from '../models/entities/transport-layover';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class TransportLayoverDetailsService {
private apiUrl="https://localhost:44320/api/TransportLayovers/";

  constructor(private httpClient:HttpClient) { }

  getTransportLayoverDetails(transportLayoverId:number):Observable<SingleResponseModel<TransportLayover>>{

    let newPath=this.apiUrl+'gettransportlayoverdetails?congressId='+transportLayoverId;
    return this.httpClient.get<SingleResponseModel<TransportLayover>>(newPath);
  }
}
