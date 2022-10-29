import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Congress } from '../models/entities/congress';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CongressService {
 private apiURL="https://localhost:44320/api/Congresses/";
  constructor(private httpClient:HttpClient) { }

  getCongress():Observable<ListResponseModel<Congress>>{
    let newPath =this.apiURL+'getall';
    return this.httpClient.get<ListResponseModel<Congress>>(newPath);
  }

  add(congress:Congress):Observable<ResponseModel>{
    let newPath=this.apiURL+'add';
    return this.httpClient.post<ResponseModel>(newPath,congress);
  }

  delete(congress:Congress):Observable<ResponseModel>{
    let newPath=this.apiURL+'delete';
    return this.httpClient.post<ResponseModel>(newPath,congress);
  }

  update(congress:Congress):Observable<ResponseModel>{
    let newPaht=this.apiURL+'update';
    return this.httpClient.post<ResponseModel>(newPaht,congress);
  }
}
