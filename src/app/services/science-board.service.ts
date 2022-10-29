import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScienceBoard } from '../models/entities/science-board';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ScienceBoardService {

  private apiUrl="https://localhost:44320/api/ScienceBoards/";
  constructor(private httpClient:HttpClient) { }

  getScienceBoards():Observable<ListResponseModel<ScienceBoard>>{
    let newPaht=this.apiUrl+'getall';
    return this.httpClient.get<ListResponseModel<ScienceBoard>>(newPaht);
  }

  getScienceBoardById(scienceBoardId:number):Observable<SingleResponseModel<ScienceBoard>>{
    let newPaht=this.apiUrl+'getbyid?id='+scienceBoardId;
    return this.httpClient.get<SingleResponseModel<ScienceBoard>>(newPaht);
  }

  add(scienceBoard:ScienceBoard):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'add';
    return this.httpClient.post<ResponseModel>(newPaht,scienceBoard);
  }

  delete(scienceBoard:ScienceBoard):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'delete';
    return this.httpClient.post<ResponseModel>(newPaht,scienceBoard);
  }

  update(scienceBoard:ScienceBoard):Observable<ResponseModel>{
    let newPaht=this.apiUrl+'update';
    return this.httpClient.post<ResponseModel>(newPaht,scienceBoard);
  }
}
