import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransportLayover } from 'src/app/models/entities/transport-layover';
import { TransportLayoverImageService } from 'src/app/services/transport-layover-image.service';
import { TransportLayoverService } from 'src/app/services/transport-layover.service';
import { AdminTransportLayoverAddComponent } from '../admin-transport-layover-add/admin-transport-layover-add.component';
import { AdminTransportLayoverDeleteComponent } from '../admin-transport-layover-delete/admin-transport-layover-delete.component';
import { AdminTransportLayoverUpdateComponent } from '../admin-transport-layover-update/admin-transport-layover-update.component';
 
@Component({
  selector: 'app-admin-transport-layover-manager',
  templateUrl: './admin-transport-layover-manager.component.html',
  styleUrls: ['./admin-transport-layover-manager.component.css']
})
export class AdminTransportLayoverManagerComponent implements OnInit {

  transportlayovers:TransportLayover[];
  DataLoadded:boolean=false;

  constructor(
    private transportLayoverService:TransportLayoverService,
    private transportLayoverImageService:TransportLayoverImageService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getTransportLayover();
  }

  getTransportLayover(){
    this.transportLayoverService.getTransportLayovers().subscribe(response=>{
      this.transportlayovers=response.data;
      this.DataLoadded=true;
     
    })
  }

  getImagePath(imagePath: string) {
    return this.transportLayoverImageService.getImagePath(imagePath);
  }

  showTransportUpdateModal(transportlayover: TransportLayover) {
    const transportUpdateModal = this.dialog.open(AdminTransportLayoverUpdateComponent, {
      disableClose: true,
      width: '100%',
      height:'80%'

    });
    transportUpdateModal.componentInstance.currentTransport = transportlayover;

    transportUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showTransportDeleteModal(transportlayover: TransportLayover) {
    const transportDeleteModal = this.dialog.open(AdminTransportLayoverDeleteComponent, {
      disableClose: true,
      width: '100%'

    });
    transportDeleteModal.componentInstance.deletedTransport = transportlayover;

    transportDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showTransportAddModal() {
    const transportAddModal = this.dialog.open(AdminTransportLayoverAddComponent, {
      disableClose: true,
      width: '100%',
      height:'80%'
    });

    transportAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
