import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { retry } from 'rxjs';
import { Congress } from 'src/app/models/entities/congress';
import { CongressImageService } from 'src/app/services/congress-image.service';
import { CongressService } from 'src/app/services/congress.service';

@Component({
  selector: 'app-admin-congress-delete',
  templateUrl: './admin-congress-delete.component.html',
  styleUrls: ['./admin-congress-delete.component.css']
})
export class AdminCongressDeleteComponent implements OnInit {
deletedCongress:Congress;
  constructor(
    private congressDeleteModal:MatDialogRef<AdminCongressDeleteComponent>,
    private congressImageService:CongressImageService,
    private congressService:CongressService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(congress:Congress){
    this.congressService.delete(congress).subscribe(response=>{
      this.toastrService.success(congress.congressName +" Kongre Silindi","Silme İşlemi Başarılı");
      console.log(this.deletedCongress);
      this.closeCongressDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız");
    })
  }

  getImagePath(imagePath:string){
    return this.congressImageService.getImagePath(imagePath);
  }

  closeCongressDeleteModal(){
    this.congressDeleteModal.close();
  }

}
