import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-admin-topic-add',
  templateUrl: './admin-topic-add.component.html',
  styleUrls: ['./admin-topic-add.component.css']
})
export class AdminTopicAddComponent implements OnInit {
topicAddForm:FormGroup
  constructor(
    private topicService:TopicService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService,
    private topicAddModal:MatDialogRef<AdminTopicAddComponent>
  ) { } 

  ngOnInit(): void {
    this.createTopicAddForm();
  }

  createTopicAddForm(){
    this.topicAddForm=this.formService.createTopicForm();
  }

  closeTopicAddModal(){
    this.topicAddModal.close();
  }

  add(){
if (this.topicAddForm.valid) {
  let topicModel=Object.assign({},this.topicAddForm.value);
  this.topicService.add(topicModel).subscribe(()=>{
    this.toastrService.success(topicModel.topicName,"Konu Eklendi");
    this.closeTopicAddModal();
  },errorResponse=>{
    this.errorService.showBackendError(errorResponse,"Konu Eklenemedi");
  })
}else{
  this.toastrService.error("konu adı 2-50 arasında olamlıdır","Form Geçersiz");
  this.topicAddForm.reset();
}
  }

}
