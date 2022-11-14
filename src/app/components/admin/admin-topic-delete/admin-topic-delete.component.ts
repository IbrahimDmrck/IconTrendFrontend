import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Topic } from 'src/app/models/entities/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-admin-topic-delete',
  templateUrl: './admin-topic-delete.component.html',
  styleUrls: ['./admin-topic-delete.component.css']
})
export class AdminTopicDeleteComponent implements OnInit {
deletedTopic:Topic;
  constructor(
    private topicService:TopicService,
    private deleteTopicModal:MatDialogRef<AdminTopicDeleteComponent>,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

delete(topic:Topic){
this.topicService.delete(topic).subscribe(response=>{
  this.toastrService.success(topic.topicName + " Konu silindi " ,"İşlem Başarılı")
  this.closeTopicDeleteModal();
},errorResponse=>{
  this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısı")
})
}

closeTopicDeleteModal(){
  this.deleteTopicModal.close();
}

}
