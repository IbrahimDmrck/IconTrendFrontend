import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Topic } from 'src/app/models/entities/topic';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-admin-topic-update',
  templateUrl: './admin-topic-update.component.html',
  styleUrls: ['./admin-topic-update.component.css']
})
export class AdminTopicUpdateComponent implements OnInit {
currentTopic:Topic;
topicUpdateForm:FormGroup;
  constructor(
    private topicSevice:TopicService,
    private toastrService:ToastrService,
    private updateModal:MatDialogRef<AdminTopicUpdateComponent>,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createTopicUpdateForm();
  }

  update(){
    if (this.topicUpdateForm.valid) {
      let newTopic=Object.assign({},this.topicUpdateForm.value);
      newTopic.id==this.currentTopic.id;

      if (newTopic.topicName==this.currentTopic.topicName) {
        this.toastrService.error("Konularda bir değişiklik yapmadınız","Güncellem Yapılmadı");
        return;
      }
      this.topicSevice.update(newTopic).subscribe(()=>{
        this.toastrService.success("Konu Güncellendi","Güncelleme Yapıldı");
        this.closeUpdateModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Konu Güncelleme işlemi başarısız");
      })
    }else{
      this.toastrService.error("Konu adı 2-50 arasında olmalıdır","Form Geçersiz");
    }
  }

  closeUpdateModal(){
    this.updateModal.close();
  }

  createTopicUpdateForm(){
    this.topicUpdateForm=this.formService.createTopicForm();
  }
}
