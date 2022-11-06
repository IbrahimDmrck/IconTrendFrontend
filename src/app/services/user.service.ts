import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { User } from '../models/entities/user';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiURL="https://localhost:44320/api/";

  constructor(
    private httpClient:HttpClient
  ) { }

  updateProfile(user:User):Observable<ResponseModel>{
    let newPath=this.apiURL+'Users/update'
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  getUsers():Observable<ListResponseModel<User>>{
    let newPath=this.apiURL+'Users/getall';

    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
}
