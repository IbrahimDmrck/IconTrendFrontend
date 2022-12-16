import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Contact } from '../models/entities/contact';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 private ApiUrl="https://localhost:44320/api/Contacts/";
  constructor(private httpClient:HttpClient) { }

  add(contact:Contact):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPaht,contact);
  }

  delete(contact:Contact):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPaht,contact);
  }

  update(contact:Contact):Observable<ResponseModel>{
    let newPaht=this.ApiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPaht,contact)
  }

  getContactById(contactId:number):Observable<SingleResponseModel<Contact>>{
    let newPaht=this.ApiUrl+"getbyid?id="+contactId;
    return this.httpClient.get<SingleResponseModel<Contact>>(newPaht);
  }

  getContact():Observable<ListResponseModel<Contact>>{
    let newPaht=this.ApiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Contact>>(newPaht);
  }


}
