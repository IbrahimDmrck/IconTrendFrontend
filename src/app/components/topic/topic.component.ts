import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from 'src/app/models/entities/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topic:Topic[];
  topicDataLoaded:boolean=false;
  constructor(
    private topicService:TopicService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(){
    this.topicService.getTopics().subscribe(response=>{
      this.topic=response.data;
      this.topicDataLoaded=true;
    })
  }

}
