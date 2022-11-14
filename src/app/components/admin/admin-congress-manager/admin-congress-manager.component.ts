import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Congress } from 'src/app/models/entities/congress';
import { CongressImage } from 'src/app/models/entities/congress-image';
import { CongressImageService } from 'src/app/services/congress-image.service';
import { CongressService } from 'src/app/services/congress.service';
import { AdminCongressAddComponent } from '../admin-congress-add/admin-congress-add.component';
import { AdminCongressDeleteComponent } from '../admin-congress-delete/admin-congress-delete.component';
import { AdminCongressUpdateComponent } from '../admin-congress-update/admin-congress-update.component';

@Component({
  selector: 'app-admin-congress-manager',
  templateUrl: './admin-congress-manager.component.html',
  styleUrls: ['./admin-congress-manager.component.css']
})
export class AdminCongressManagerComponent implements OnInit {

  
  congresses:Congress[];
  congressDataLoad:boolean=false;
  congressImages:CongressImage[];

  constructor(
    private congressService:CongressService,
    private congressImageService:CongressImageService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getCongress();
  }

  getCongress(){
    this.congressService.getCongress().subscribe(response=>{
      this.congresses=response.data;
      this.congressDataLoad=true;
    })
  }

  getImagePath(imagePath:string){
    return this.congressImageService.getImagePath(imagePath);
  }

  showCongressUpdateModal(congress: Congress) {
    const congressUpdateModal = this.dialog.open(AdminCongressUpdateComponent, {
      disableClose: true,
      width: "90%"
    });
    congressUpdateModal.componentInstance.currentCongress = congress;

    congressUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showCongressDeleteModal(congress: Congress) {
    const congressDeleteModal = this.dialog.open(AdminCongressDeleteComponent, {
      disableClose: true,
      width: "90%"
    });
    congressDeleteModal.componentInstance.deletedCongress = congress;

    congressDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showCongressAddModal() {
    const congressAddModal = this.dialog.open(AdminCongressAddComponent, {
      disableClose: true,
      width: "50%",
    });

    congressAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
