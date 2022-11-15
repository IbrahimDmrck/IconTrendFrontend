import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransportLayover } from 'src/app/models/entities/transport-layover';
import { TransportLayoverImageService } from 'src/app/services/transport-layover-image.service';
import { TransportLayoverService } from 'src/app/services/transport-layover.service';

@Component({
  selector: 'app-admin-transport-layover-delete',
  templateUrl: './admin-transport-layover-delete.component.html',
  styleUrls: ['./admin-transport-layover-delete.component.css']
})
export class AdminTransportLayoverDeleteComponent implements OnInit {
deletedTransport:TransportLayover;
  constructor(
    private transportDeleteModal:MatDialogRef<AdminTransportLayoverDeleteComponent>,
    private transportLayoverImageService:TransportLayoverImageService,
    private transportService:TransportLayoverService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(transport:TransportLayover){
    this.transportService.delete(transport).subscribe(response=>{
      this.toastrService.success("Ulaşım bilgisi silindi","Silme işlemi başarılı");
      this.closeTransportDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız");
    })
  }

  getImagePath(imagePath:string){
    return this.transportLayoverImageService.getImagePath(imagePath);
  }

  closeTransportDeleteModal(){
    this.transportDeleteModal.close();
  }
}
