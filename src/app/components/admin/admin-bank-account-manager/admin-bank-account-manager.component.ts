import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BankAccountInfo } from 'src/app/models/entities/bank-account-info';
import { BankAccountInfoService } from 'src/app/services/bank-account-info.service';
import { AdminBankAccountAddComponent } from '../admin-bank-account-add/admin-bank-account-add.component';
import { AdminBankAccountDeleteComponent } from '../admin-bank-account-delete/admin-bank-account-delete.component';
import { AdminBankAccountUpdateComponent } from '../admin-bank-account-update/admin-bank-account-update.component';
 
@Component({
  selector: 'app-admin-bank-account-manager',
  templateUrl: './admin-bank-account-manager.component.html',
  styleUrls: ['./admin-bank-account-manager.component.css']
})
export class AdminBankAccountManagerComponent implements OnInit {
bankAccounts:BankAccountInfo[];
DataLoad:boolean=false;
  constructor(
    private bankAccountService:BankAccountInfoService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getBankAccountInfo();
  }

getBankAccountInfo(){
  this.bankAccountService.getBankAccount().subscribe(response=>{
    this.bankAccounts=response.data;
    this.DataLoad=true;
  })
}

showBankAccountInfoDeleteModal(accountInfo:BankAccountInfo){
    const bankAccountDeleteModal=this.dialog.open(AdminBankAccountDeleteComponent,{
      disableClose:true,
      width:'95%',
      height:'80%'
    });

    bankAccountDeleteModal.componentInstance.deletedBankAccount=accountInfo;
    bankAccountDeleteModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    }) 
  }
 
  showBankAccountInfoUpdateModal(accountInfo:BankAccountInfo){
    const bankAccountUpdateModal=this.dialog.open(AdminBankAccountUpdateComponent,{

      disableClose:true,
      width:'100%',
      height:'80%'
    });

    bankAccountUpdateModal.componentInstance.currentBankAccount=accountInfo;
    bankAccountUpdateModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showBankAccountInfoAddModal(){
    const bankAccountAddModal=this.dialog.open(AdminBankAccountAddComponent,{
      disableClose:true,
      width:'100%',
      height:'80%'
    });
    bankAccountAddModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

}
 