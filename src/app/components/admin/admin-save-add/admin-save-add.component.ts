import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { SaveService } from 'src/app/services/save.service';

@Component({ 
  selector: 'app-admin-save-add',
  templateUrl: './admin-save-add.component.html',
  styleUrls: ['./admin-save-add.component.css']
})
export class AdminSaveAddComponent implements OnInit {
saveAddForm:FormGroup;
  constructor(
    private saveService:SaveService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService,
    private saveAddModal:MatDialogRef<AdminSaveAddComponent>
  ) { }

  ngOnInit(): void { 
    this.createSaveAddForm();
  }
  createSaveAddForm(){
    this.saveAddForm=this.formService.createSaveForm();
  }

  closeSaveAddModal(){
    this.saveAddModal.close();
  }

  add(){
    if (this.saveAddForm.valid) {
      let saveModel=Object.assign({},this.saveAddForm.value);
      this.saveService.add(saveModel).subscribe(()=>{
        this.toastrService.success(saveModel.topicName,"Konu Eklendi");
        this.closeSaveAddModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Konu Eklenemedi");
      })
    }else{
      this.toastrService.error("konu adı 2-50 arasında olamlıdır","Form Geçersiz");
      this.saveAddForm.reset();
    }
      }

}
