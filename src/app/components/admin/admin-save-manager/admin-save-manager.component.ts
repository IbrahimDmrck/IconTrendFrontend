import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Save } from 'src/app/models/entities/save';
import { SaveService } from 'src/app/services/save.service';
import { AdminSaveAddComponent } from '../admin-save-add/admin-save-add.component';
import { AdminSaveDeleteComponent } from '../admin-save-delete/admin-save-delete.component';
import { AdminSaveUpdateComponent } from '../admin-save-update/admin-save-update.component';

@Component({
  selector: 'app-admin-save-manager',
  templateUrl: './admin-save-manager.component.html',
  styleUrls: ['./admin-save-manager.component.css']
}) 
export class AdminSaveManagerComponent implements OnInit {
saves:Save[];
DataLoad:boolean=false;
  constructor(
    private saveService:SaveService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getSave();
  }

  getSave(){
    this.saveService.getSave().subscribe(response=>{
      this.saves=response.data;
      this.DataLoad=true;
    })
  }

  showSaveDeleteModal(save:Save){
    const saveDeleteModal=this.dialog.open(AdminSaveDeleteComponent,{
      disableClose:true,
      width:'95%',
      height:'80%'
    });

    saveDeleteModal.componentInstance.deletedSave=save;
    saveDeleteModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    }) 
  }
 
  showSaveUpdateModal(save:Save){
    const saveUpdateModal=this.dialog.open(AdminSaveUpdateComponent,{

      disableClose:true,
      width:'95%',
      height:'80%'
    });

    saveUpdateModal.componentInstance.currentSave=save;
    saveUpdateModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showSaveAddModal(){
    const saveAddModal=this.dialog.open(AdminSaveAddComponent,{
      disableClose:true,
      width:'95%',
      height:'80%'
    });
    saveAddModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

}
