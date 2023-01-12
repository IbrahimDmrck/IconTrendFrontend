import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Kongre } from 'src/app/models/entities/kongre';
import { KongreImageService } from 'src/app/services/kongre-image.service';
import { KongreService } from 'src/app/services/kongre.service';
import { AdminKongreAddComponent } from '../admin-kongre-add/admin-kongre-add.component';
import { AdminKongreDeleteComponent } from '../admin-kongre-delete/admin-kongre-delete.component';
import { AdminKongreUpdateComponent } from '../admin-kongre-update/admin-kongre-update.component';

@Component({
  selector: 'app-admin-kongre-manager',
  templateUrl: './admin-kongre-manager.component.html',
  styleUrls: ['./admin-kongre-manager.component.css']
})
export class AdminKongreManagerComponent implements OnInit {

  kongres:Kongre[];
  kongreDataLoad:boolean=false;
  constructor(
    private kongreService:KongreService,
    private kongreImageService:KongreImageService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getKongre();
  }

  getKongre(){
    this.kongreService.getKongre().subscribe(response=>{
      this.kongres=response.data;
      this.kongreDataLoad=true;
    })
  }

  showKongreDeleteModal(kongre: Kongre) {
    const kongreDeleteModal = this.dialog.open(AdminKongreDeleteComponent, {
      disableClose: true,
      width: "100%"
    });
    kongreDeleteModal.componentInstance.deletedKongre = kongre;

    kongreDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showKongreUpdateModal(kongre: Kongre) {
    const kongreUpdateModal = this.dialog.open(AdminKongreUpdateComponent, {
      disableClose: true,
      width: '100%',
      height:'80%'
    });
    kongreUpdateModal.componentInstance.currentCongre = kongre;

    kongreUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showKongreAddModal() {
    const kongreAddModal = this.dialog.open(AdminKongreAddComponent, {
      disableClose: true,
      width: '100%',
      height:'80%'
    });

    kongreAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

}
