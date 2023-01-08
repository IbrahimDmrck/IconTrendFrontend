import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BankAccountInfo } from 'src/app/models/entities/bank-account-info';
import { BankAccountInfoService } from 'src/app/services/bank-account-info.service';

@Component({
  selector: 'app-admin-bank-account-delete',
  templateUrl: './admin-bank-account-delete.component.html',
  styleUrls: ['./admin-bank-account-delete.component.css']
})
export class AdminBankAccountDeleteComponent implements OnInit {
deletedBankAccount:BankAccountInfo;
  constructor(
    private bankAccountService:BankAccountInfoService,
    private deleteBankAccountModal:MatDialogRef<AdminBankAccountDeleteComponent>,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(bankAccount:BankAccountInfo){
    this.bankAccountService.delete(bankAccount).subscribe(response=>{
      this.toastrService.success("Banka Bilgisi Siliniyor" + " Banka Bilgisi Silindi")
      this.closeBankAccountDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız")
    })
      }
    
      closeBankAccountDeleteModal(){
        this.deleteBankAccountModal.close();
      }
} 
