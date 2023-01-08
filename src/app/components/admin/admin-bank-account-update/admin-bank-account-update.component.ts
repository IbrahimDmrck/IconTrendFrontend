import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BankAccountInfo } from 'src/app/models/entities/bank-account-info';
import { BankAccountInfoService } from 'src/app/services/bank-account-info.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-admin-bank-account-update',
  templateUrl: './admin-bank-account-update.component.html',
  styleUrls: ['./admin-bank-account-update.component.css']
})
export class AdminBankAccountUpdateComponent implements OnInit {
currentBankAccount:BankAccountInfo;
bankAccountUpdateForm:FormGroup;
  constructor(
    private bankAccountService:BankAccountInfoService,
    private toastrService:ToastrService,
    private updateModal:MatDialogRef<AdminBankAccountUpdateComponent>,
    private errorService:ErrorService,
    private formService:FormService
  ) { } 

  ngOnInit(): void {
    this.createBankAccountUpdateForm();
  }

  createBankAccountUpdateForm(){
    this.bankAccountUpdateForm=this.formService.createBankAccountInfo();
  }

  closeUpdateModal(){
    this.updateModal.close();
  }

  update(){
    if (this.bankAccountUpdateForm.valid) {
      let newBankAccount=Object.assign({},this.bankAccountUpdateForm.value);
      newBankAccount.id=this.currentBankAccount.id;

     
      this.bankAccountService.update(newBankAccount).subscribe(()=>{
        this.toastrService.success("Banka Bilgileri Güncellendi","Güncelleme Yapıldı");
        this.closeUpdateModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Banka Bilgileri Güncelleme İşlemi Başarısız Oldu");
      })
    }else{
      this.toastrService.error("Formu Dikkatli Doldurun","Form Geçersiz");
    }
  }

}
