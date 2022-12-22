import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Kongre } from 'src/app/models/entities/kongre';
import { KongreImageService } from 'src/app/services/kongre-image.service';
import { KongreService } from 'src/app/services/kongre.service';
 
@Component({
  selector: 'app-admin-kongre-delete',
  templateUrl: './admin-kongre-delete.component.html',
  styleUrls: ['./admin-kongre-delete.component.css']
})
export class AdminKongreDeleteComponent implements OnInit {
deletedKongre:Kongre;
  constructor(
    private kongreDeleteModal:MatDialogRef<AdminKongreDeleteComponent>,
    private kongreImageService:KongreImageService,
    private kongreService:KongreService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }


  delete(kongre:Kongre){
    this.kongreService.delete(kongre).subscribe(response0=>{
      this.toastrService.success(kongre.kongreAdi +" Silindi" ,"Silme işlemi başarılı");
      this.closeKongreDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız");
    })
  }

  getImagePath(imagePath:string){
    return this.kongreImageService.getImagePath(imagePath);
  } 

  closeKongreDeleteModal(){
    this.kongreDeleteModal.close();
  }
}
