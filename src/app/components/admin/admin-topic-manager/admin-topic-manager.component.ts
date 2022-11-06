import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Topic } from 'src/app/models/entities/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-admin-topic-manager',
  templateUrl: './admin-topic-manager.component.html',
  styleUrls: ['./admin-topic-manager.component.css']
})
export class AdminTopicManagerComponent implements OnInit {

  topics:Topic[];
  Dataloadded:boolean=false;
  constructor(
    private topicService:TopicService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(){
 this.topicService.getTopics().subscribe(response=>{
  this.topics=response.data;
  this.Dataloadded=true;
  this.toastrService.success("İşlem Başarılı","Konular Listelendi");
 })
  }
  
}
