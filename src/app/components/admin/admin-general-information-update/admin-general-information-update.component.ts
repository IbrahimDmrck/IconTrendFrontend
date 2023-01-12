import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GeneralInformation } from 'src/app/models/entities/general-information';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { GeneralInformationService } from 'src/app/services/general-information.service';

@Component({
  selector: 'app-admin-general-information-update',
  templateUrl: './admin-general-information-update.component.html',
  styleUrls: ['./admin-general-information-update.component.css']
})
export class AdminGeneralInformationUpdateComponent implements OnInit {
currentGeneralInfo:GeneralInformation;
generalInformationUpdateForm:FormGroup;
  constructor(
    private generalInformationService:GeneralInformationService,
    private toastrService:ToastrService,
    private generalInfoUpdateModal:MatDialogRef<AdminGeneralInformationUpdateComponent>,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createGeneralInfoUpdateForm();
  }
  closeGeneralInfoUpdateModal(){
    this.generalInfoUpdateModal.close();
  }

  createGeneralInfoUpdateForm(){
    this.generalInformationUpdateForm=this.formService.createGeneralInfo();
  }

  update(){
    if (this.generalInformationUpdateForm.valid) {
      let newSave=Object.assign({},this.generalInformationUpdateForm.value);
      newSave.id=this.currentGeneralInfo.id;

     
      this.generalInformationService.update(newSave).subscribe(()=>{
        this.toastrService.success("Genel Bilgiler Güncellendi","Güncelleme Yapıldı");
        this.closeGeneralInfoUpdateModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Genel Bilgi Güncelleme işlemi başarısız");
      })
    }else{
      this.toastrService.error("Formu Dikkatli Doldurun","Form Geçersiz");
    }
  }
} 
