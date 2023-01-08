import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Save } from 'src/app/models/entities/save';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { SaveService } from 'src/app/services/save.service';

@Component({
  selector: 'app-admin-save-update',
  templateUrl: './admin-save-update.component.html',
  styleUrls: ['./admin-save-update.component.css']
})
export class AdminSaveUpdateComponent implements OnInit {
currentSave:Save;
saveUpdateForm:FormGroup;
  constructor(
    private saveService:SaveService,
    private toastrService:ToastrService,
    private updateModal:MatDialogRef<AdminSaveUpdateComponent>,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createSaveUpdateForm();
  }

  closeUpdateModal(){
    this.updateModal.close();
  }

  createSaveUpdateForm(){
    this.saveUpdateForm=this.formService.createSaveForm();
  }
 
  update(){
    if (this.saveUpdateForm.valid) {
      let newSave=Object.assign({},this.saveUpdateForm.value);
      newSave.id=this.currentSave.id;

     
      this.saveService.update(newSave).subscribe(()=>{
        this.toastrService.success("Kayıt Güncellendi","Güncelleme Yapıldı");
        this.closeUpdateModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Kayıt Güncelleme işlemi başarısız");
      })
    }else{
      this.toastrService.error("Formu Dikkatli Doldurun","Form Geçersiz");
    }
  }

}
