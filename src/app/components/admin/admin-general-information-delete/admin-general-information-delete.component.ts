import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GeneralInformation } from 'src/app/models/entities/general-information';
import { GeneralInformationService } from 'src/app/services/general-information.service';

@Component({
  selector: 'app-admin-general-information-delete',
  templateUrl: './admin-general-information-delete.component.html',
  styleUrls: ['./admin-general-information-delete.component.css']
})
export class AdminGeneralInformationDeleteComponent implements OnInit {
deletedGeneralInfo:GeneralInformation;
  constructor(
    private generalInfoService:GeneralInformationService,
    private deleteGeneralInfoModal:MatDialogRef<AdminGeneralInformationDeleteComponent>,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(generalInfo:GeneralInformation){
    this.generalInfoService.delete(generalInfo).subscribe(response=>{
      this.toastrService.success("Genel Bilgi Siliniyor" + " Genel Bilgi Silindi")
      this.closeGeneralInfoDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız")
    })
      }
    
      closeGeneralInfoDeleteModal(){
        this.deleteGeneralInfoModal.close();
      }

} 
