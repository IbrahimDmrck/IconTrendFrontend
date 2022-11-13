import { Component, ComponentRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CongressPresident } from 'src/app/models/entities/congress-president';
import { CongressPresidentService } from 'src/app/services/congress-president.service';
import { AdminCongressPresidentAddComponent } from '../admin-congress-president-add/admin-congress-president-add.component';
import { AdminCongressPresidentDeleteComponent } from '../admin-congress-president-delete/admin-congress-president-delete.component';

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
      width:'25%'
    });

    presidentDeleteModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
}

