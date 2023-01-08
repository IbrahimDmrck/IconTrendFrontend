import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TrBankAccountInfo } from 'src/app/models/entities/tr-bank-account-info';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { TrBankAccountInfoService } from 'src/app/services/tr-bank-account-info.service';

@Component({
  selector: 'app-admin-tr-bank-account-update',
  templateUrl: './admin-tr-bank-account-update.component.html',
  styleUrls: ['./admin-tr-bank-account-update.component.css']
})
export class AdminTrBankAccountUpdateComponent implements OnInit {
  currentTrBankAccount:TrBankAccountInfo;
  trBankAccountUpdateForm:FormGroup;
  constructor(
    private trBankAccountService:TrBankAccountInfoService,
    private toastrService:ToastrService,
    private updateModal:MatDialogRef<AdminTrBankAccountUpdateComponent>,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createTrBankAccountUpdateForm();
  }
  createTrBankAccountUpdateForm(){
    this.trBankAccountUpdateForm=this.formService.createTrBankAccountInfo();
  }

  closeUpdateModal(){
    this.updateModal.close();
  }

  update(){
    if (this.trBankAccountUpdateForm.valid) {
      let newTrBankAccount=Object.assign({},this.trBankAccountUpdateForm.value);
      newTrBankAccount.id=this.currentTrBankAccount.id;

     
      this.trBankAccountService.update(newTrBankAccount).subscribe(()=>{
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
