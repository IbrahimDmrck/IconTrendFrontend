import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrBankAccountInfo } from 'src/app/models/entities/tr-bank-account-info';
import { TrBankAccountInfoService } from 'src/app/services/tr-bank-account-info.service';
import { AdminTrBankAccountAddComponent } from '../admin-tr-bank-account-add/admin-tr-bank-account-add.component';
import { AdminTrBankAccountDeleteComponent } from '../admin-tr-bank-account-delete/admin-tr-bank-account-delete.component';
import { AdminTrBankAccountUpdateComponent } from '../admin-tr-bank-account-update/admin-tr-bank-account-update.component';

@Component({
  selector: 'app-admin-tr-bank-account-manager',
  templateUrl: './admin-tr-bank-account-manager.component.html',
  styleUrls: ['./admin-tr-bank-account-manager.component.css']
})
export class AdminTrBankAccountManagerComponent implements OnInit {
  trBankAccounts:TrBankAccountInfo[];
  DataLoad:boolean=false;
  constructor(
    private trBankAccountService:TrBankAccountInfoService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getTrBankAccountInfo();
  }

  getTrBankAccountInfo(){
    this.trBankAccountService.getTrBankAccount().subscribe(response=>{
      this.trBankAccounts=response.data;
      this.DataLoad=true;
    })
  }

  
showTrBankAccountInfoDeleteModal(trBank:TrBankAccountInfo){
  const trBankAccountDeleteModal=this.dialog.open(AdminTrBankAccountDeleteComponent,{
    disableClose:true,
    width:'100%',
    height:'80%'
  });

  trBankAccountDeleteModal.componentInstance.deletedTrBankAccount=trBank;
  trBankAccountDeleteModal.afterClosed().subscribe(result=>{
    this.ngOnInit();
  }) 
}

showTrBankAccountInfoUpdateModal(trBank:TrBankAccountInfo){
  const trBankAccountUpdateModal=this.dialog.open(AdminTrBankAccountUpdateComponent,{

    disableClose:true,
    width:'100%',
    height:'80%'
  });

  trBankAccountUpdateModal.componentInstance.currentTrBankAccount=trBank;
  trBankAccountUpdateModal.afterClosed().subscribe(result=>{
    this.ngOnInit();
  })
}

showTrBankAccountInfoAddModal(){
  const trBankAccountAddModal=this.dialog.open(AdminTrBankAccountAddComponent,{
    disableClose:true,
    width:'100%',
    height:'80%'
  });
  trBankAccountAddModal.afterClosed().subscribe(result=>{
    this.ngOnInit();
  })
}

}
