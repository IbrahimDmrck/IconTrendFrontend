import { Component, Input,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CongressPresident } from 'src/app/models/entities/congress-president';
import { CongressPresidentService } from 'src/app/services/congress-president.service';


@Component({
  selector: 'app-admin-congress-president-delete',
  templateUrl: './admin-congress-president-delete.component.html',
  styleUrls: ['./admin-congress-president-delete.component.css']
})
export class AdminCongressPresidentDeleteComponent implements OnInit {

deletedPresident:CongressPresident;

  constructor(
    private deletePresidentModal:MatDialogRef<AdminCongressPresidentDeleteComponent>,
    private congressPresidentService:CongressPresidentService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }



  delete(president:CongressPresident){
    this.congressPresidentService.delete(president).subscribe((response)=>{
      this.toastrService.success(president.congressPresidentName + " Kongre Başkanı Silindi ","Silme İşlemi Başarılı")
      this.closePresidentDeleteModal();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız")
    })
  }

  closePresidentDeleteModal(){
    this.deletePresidentModal.close();
  }

}
