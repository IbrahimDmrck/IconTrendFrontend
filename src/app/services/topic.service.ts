import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../models/entities/topic';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiURL="https://localhost:44320/api/Topics/";
  constructor(private httpClient:HttpClient) { }

  getTopics():Observable<ListResponseModel<Topic>>{
    let newPath =this.apiURL+'getall';
    return this.httpClient.get<ListResponseModel<Topic>>(newPath);
  }

  getTopicById(topicId:number):Observable<SingleResponseModel<Topic>>{
    let newPaht = this.apiURL+'getbyid?id='+topicId;
    return this.httpClient.get<SingleResponseModel<Topic>>(newPaht);
  }

  add(topic:Topic):Observable<ResponseModel>{
    let newPath=this.apiURL+'add';
    return this.httpClient.post<ResponseModel>(newPath,topic);
  }

  delete(topic:Topic):Observable<ResponseModel>{
    let newPath=this.apiURL+'delete';
    return this.httpClient.post<ResponseModel>(newPath,topic);
  }

  update(topic:Topic):Observable<ResponseModel>{
    let newPaht=this.apiURL+'update';
    return this.httpClient.post<ResponseModel>(newPaht,topic);
  }

}
