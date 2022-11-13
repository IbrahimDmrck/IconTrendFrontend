import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CongressPresident } from '../models/entities/congress-president';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CongressPresidentService {
private apiUrl="https://localhost:44320/api/CongressPresidents/";
  constructor(private httpClient:HttpClient) { }

  getCongressPresidents():Observable<ListResponseModel<CongressPresident>>{
    let newPath=this.apiUrl+'getall';
    return this.httpClient.get<ListResponseModel<CongressPresident>>(newPath);
  }

  getCongressPresidentById(congressPresidentId:number):Observable<SingleResponseModel<CongressPresident>>{
    let newPaht=this.apiUrl+'getbyid?id='+congressPresidentId;
    return this.httpClient.get<SingleResponseModel<CongressPresident>>(newPaht);
  }

  add(congressPresident:CongressPresident):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'add';
    return this.httpClient.post<ResponseModel>(newPaht,congressPresident);
  }

  delete(congressPresident:CongressPresident):Observable<ResponseModel>{
    let newPath=this.apiUrl+'delete';
    return this.httpClient.post<ResponseModel>(newPath,congressPresident);
  }

  updata(congressPresident:CongressPresident):Observable<ResponseModel>{
    let newPath=this.apiUrl+'update';
    return this.httpClient.post<ResponseModel>(newPath,congressPresident);
  }

}
