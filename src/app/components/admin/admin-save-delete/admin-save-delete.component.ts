import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Save } from 'src/app/models/entities/save';
import { SaveService } from 'src/app/services/save.service';

@Component({
  selector: 'app-admin-save-delete',
  templateUrl: './admin-save-delete.component.html',
  styleUrls: ['./admin-save-delete.component.css']
})
export class AdminSaveDeleteComponent implements OnInit {
  deletedSave:Save;
  constructor(
    private saveService:SaveService,
    private deleteSaveModal:MatDialogRef<AdminSaveDeleteComponent>,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(save:Save){
    this.saveService.delete(save).subscribe(response=>{
      this.toastrService.success("Kayıt Bilgisi Siliniyor" + " Kayıt Bilgisi Silindi")
      this.closeSaveDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız")
    })
      }
    
      closeSaveDeleteModal(){
        this.deleteSaveModal.close();
      }

}
 