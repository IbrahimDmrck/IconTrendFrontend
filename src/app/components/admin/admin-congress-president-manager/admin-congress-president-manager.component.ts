import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CongressPresident } from 'src/app/models/entities/congress-president';
import { CongressPresidentService } from 'src/app/services/congress-president.service';
import { AdminCongressPresidentAddComponent } from '../admin-congress-president-add/admin-congress-president-add.component';
import { AdminCongressPresidentDeleteComponent } from '../admin-congress-president-delete/admin-congress-president-delete.component';
import { AdminCongressPresidentUpdateComponent } from '../admin-congress-president-update/admin-congress-president-update.component';

@Component({
  selector: 'app-admin-congress-president-manager',
  templateUrl: './admin-congress-president-manager.component.html',
  styleUrls: ['./admin-congress-president-manager.component.css']
})
export class AdminCongressPresidentManagerComponent implements OnInit {

  congressPresidents:CongressPresident[];
  DataLoaded:boolean=false;

  constructor(
    private congressPresidentService:CongressPresidentService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getCongressPresident();
  }

  getCongressPresident(){
    this.congressPresidentService.getCongressPresidents().subscribe(response=>{
      this.congressPresidents=response.data;
      this.DataLoaded=true;
    })
  }

  showCongressPresidentUpdateModal(congressPresident:CongressPresident){
const presidentUpdateModal=this.dialog.open(AdminCongressPresidentUpdateComponent,{
  disableClose:true,
  width:'50%'
});
presidentUpdateModal.componentInstance.currentPresident=congressPresident;
presidentUpdateModal.afterClosed().subscribe(result=>{
  this.ngOnInit();
})
  }

  showCongressPresidentAddModal(){
    const presidentAddModal=this.dialog.open(AdminCongressPresidentAddComponent,{
      disableClose:true,
      width:'25%'
      
    });

    presidentAddModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showCongressPresidentDeleteModal(congressPresident:CongressPresident){
    const presidentDeleteModal=this.dialog.open(AdminCongressPresidentDeleteComponent,{
      disableClose:true,
      width:'30%'
    });
    presidentDeleteModal.componentInstance.deletedPresident=congressPresident;
    presidentDeleteModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
}

