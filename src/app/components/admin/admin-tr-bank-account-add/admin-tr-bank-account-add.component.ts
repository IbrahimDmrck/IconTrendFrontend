import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { TrBankAccountInfoService } from 'src/app/services/tr-bank-account-info.service';

@Component({
  selector: 'app-admin-tr-bank-account-add',
  templateUrl: './admin-tr-bank-account-add.component.html',
  styleUrls: ['./admin-tr-bank-account-add.component.css']
})
export class AdminTrBankAccountAddComponent implements OnInit {
trBankAccountAddForm:FormGroup;
  constructor(
     private trBankAccountService:TrBankAccountInfoService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService,
    private trBankAccountAddModal:MatDialogRef<AdminTrBankAccountAddComponent>
  ) { }

  ngOnInit(): void {
     this.createTrBankAccountAddForm();
  }

   createTrBankAccountAddForm(){
    this.trBankAccountAddForm=this.formService.createTrBankAccountInfo();
  }

   closeTrBankAccountAddModal(){
    this.trBankAccountAddModal.close();
  }

  add(){
    if (this.trBankAccountAddForm.valid) {
      let trBankAccountModel=Object.assign({},this.trBankAccountAddForm.value);
      console.log(trBankAccountModel);
      this.trBankAccountService.add(trBankAccountModel).subscribe(()=>{
        this.toastrService.success(trBankAccountModel.branch,"Banka Bilgisi Eklendi");
        this.closeTrBankAccountAddModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse.showBackendError,"Banka Bilgisi Eklenemedi");
      })
    }else{
      this.toastrService.error("Formu Dikkatli Doldurun","Form Geçersiz");
      this.trBankAccountAddForm.reset();
    }
      }

}
