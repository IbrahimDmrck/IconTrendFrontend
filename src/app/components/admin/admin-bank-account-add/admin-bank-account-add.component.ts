import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BankAccountInfoService } from 'src/app/services/bank-account-info.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-admin-bank-account-add',
  templateUrl: './admin-bank-account-add.component.html',
  styleUrls: ['./admin-bank-account-add.component.css']
})
export class AdminBankAccountAddComponent implements OnInit {
bankAccountAddForm:FormGroup;
  constructor(
    private bankAccountService:BankAccountInfoService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService,
    private bankAccountAddModal:MatDialogRef<AdminBankAccountAddComponent>
  ) { } 
 
  ngOnInit(): void {
    this.createBankAccountAddForm();
  }

  createBankAccountAddForm(){
    this.bankAccountAddForm=this.formService.createBankAccountInfo();
  }

   closeBankAccountAddModal(){
    this.bankAccountAddModal.close();
  }

    add(){
    if (this.bankAccountAddForm.valid) {
      let bankAccountModel=Object.assign({},this.bankAccountAddForm.value);
  
      this.bankAccountService.add(bankAccountModel).subscribe(()=>{
        this.toastrService.success(bankAccountModel.branch,"Banka Bilgisi Eklendi");
        this.closeBankAccountAddModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Banka Bilgisi Eklenemedi");
      })
    }else{
      this.toastrService.error("Formu Dikkatli Doldurun","Form Geçersiz");
      this.bankAccountAddForm.reset();
    }
      }

}
