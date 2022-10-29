import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegulatoryBoard } from '../models/entities/regulatory-board';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RegulatoryBoardService {
private apiUrl="https://localhost:44320/api/RegulatoryBoards/";

  constructor(private httpClient:HttpClient) { }

  getRegulatoryBoards():Observable<ListResponseModel<RegulatoryBoard>>{
    let newPaht=this.apiUrl+'getall';
    return this.httpClient.get<ListResponseModel<RegulatoryBoard>>(newPaht);
  }

  getRegulatoryBoardById(regulatoryBoardId:number):Observable<SingleResponseModel<RegulatoryBoard>>{
    let newPaht=this.apiUrl+'getbyid?id='+regulatoryBoardId;
    return this.httpClient.get<SingleResponseModel<RegulatoryBoard>>(newPaht);
  }

  add(regulatoryBoard:RegulatoryBoard):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'add';
    return this.httpClient.post<ResponseModel>(newPaht,regulatoryBoard);
  }

  delete(regulatoryBoard:RegulatoryBoard):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'delete';
    return this.httpClient.post<ResponseModel>(newPaht,regulatoryBoard);
  }

  update(regulatoryBoard:RegulatoryBoard):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'update';
    return this.httpClient.post<ResponseModel>(newPaht,regulatoryBoard);
  }

}
