import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { GeneralInformationService } from 'src/app/services/general-information.service';
 
@Component({
  selector: 'app-admin-general-information-add',
  templateUrl: './admin-general-information-add.component.html',
  styleUrls: ['./admin-general-information-add.component.css']
})
export class AdminGeneralInformationAddComponent implements OnInit {
generalInformationAddForm:FormGroup;
  constructor(
    private generalInformationService:GeneralInformationService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService,
    private generalInformationAddModal:MatDialogRef<AdminGeneralInformationAddComponent>
  ) { }

  ngOnInit(): void {
    this.createGeneralInfoAddForm();
  }

  createGeneralInfoAddForm(){
    this.generalInformationAddForm=this.formService.createGeneralInfo();
  }

  closeGeneralInfoAddModal(){
    this.generalInformationAddModal.close();
  }

  add(){
    if (this.generalInformationAddForm.valid) {
      let generalInfoModel=Object.assign({},this.generalInformationAddForm.value);
      this.generalInformationService.add(generalInfoModel).subscribe(()=>{
        this.toastrService.success(generalInfoModel.topicName,"Genel Bilgiler Eklendi");
        this.closeGeneralInfoAddModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Genel Bilgiler Eklenemedi");
      })
    }else{
      this.toastrService.error("Lütfen Form Dikkatli Doldurun","Form Geçersiz");
      this.generalInformationAddForm.reset();
    }
      }
}
