import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Congress } from '../models/entities/congress';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CongressDetailsService {

  constructor(private httpClient:HttpClient) { }
  apiURL="https://localhost:44320/api/Congresses/";

  getCongressDetails(congressId:number):Observable<SingleResponseModel<Congress>>{
    let newPath=this.apiURL+'getcongressdetails?congressId='+congressId;
    return this.httpClient.get<SingleResponseModel<Congress>>(newPath);
  }

}
