import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Topic } from 'src/app/models/entities/topic';
import { TopicService } from 'src/app/services/topic.service';
import { AdminTopicAddComponent } from '../admin-topic-add/admin-topic-add.component';
import { AdminTopicDeleteComponent } from '../admin-topic-delete/admin-topic-delete.component';
import { AdminTopicUpdateComponent } from '../admin-topic-update/admin-topic-update.component';

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
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(){
 this.topicService.getTopics().subscribe(response=>{
  this.topics=response.data;
  this.Dataloadded=true;
 })
  }

  showTopicUpdateModal(topic:Topic){
    const topicUpdateModal=this.dialog.open(AdminTopicUpdateComponent,{

      disableClose:true,
      width:'25%'
    });

    topicUpdateModal.componentInstance.currentTopic=topic;
    topicUpdateModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showTopicAddModal(){
    const topicAddModal=this.dialog.open(AdminTopicAddComponent,{
      disableClose:true,
      width:'30%'
    });
    topicAddModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showTopicDeleteModal(topic:Topic){
    const topicDeleteModal=this.dialog.open(AdminTopicDeleteComponent,{
      disableClose:true,
      width:'30%'
    });
    topicDeleteModal.componentInstance.deletedTopic=topic;
    topicDeleteModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
  
}
