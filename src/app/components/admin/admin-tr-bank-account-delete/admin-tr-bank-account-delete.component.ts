import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TrBankAccountInfo } from 'src/app/models/entities/tr-bank-account-info';
import { TrBankAccountInfoService } from 'src/app/services/tr-bank-account-info.service';

@Component({
  selector: 'app-admin-tr-bank-account-delete',
  templateUrl: './admin-tr-bank-account-delete.component.html',
  styleUrls: ['./admin-tr-bank-account-delete.component.css']
})
export class AdminTrBankAccountDeleteComponent implements OnInit {
  deletedTrBankAccount:TrBankAccountInfo;
  constructor(
    private trBankAccountService:TrBankAccountInfoService,
    private deleteTrBankAccountModal:MatDialogRef<AdminTrBankAccountDeleteComponent>,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(trBankAccount:TrBankAccountInfo){
    this.trBankAccountService.delete(trBankAccount).subscribe(response=>{
      this.toastrService.success("Banka Bilgisi Siliniyor" + " Banka Bilgisi Silindi")
      this.closeTrBankAccountDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız")
    })
      }
    
      closeTrBankAccountDeleteModal(){
        this.deleteTrBankAccountModal.close();
      }

}
 