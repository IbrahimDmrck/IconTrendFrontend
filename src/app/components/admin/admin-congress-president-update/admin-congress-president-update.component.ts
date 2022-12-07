import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CongressPresident } from 'src/app/models/entities/congress-president';
import { CongressPresidentService } from 'src/app/services/congress-president.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-admin-congress-president-update',
  templateUrl: './admin-congress-president-update.component.html',
  styleUrls: ['./admin-congress-president-update.component.css']
})
export class AdminCongressPresidentUpdateComponent implements OnInit {
currentPresident:CongressPresident;
congressPresidentUpdateForm:FormGroup
  constructor(
    private congressPresidentService:CongressPresidentService,
    private toastrService:ToastrService,
    private updateModal:MatDialogRef<AdminCongressPresidentUpdateComponent>,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createCongressPresidentUpdateForm();
  }

  update(){
    if (this.congressPresidentUpdateForm.valid) {
      let newPresident=Object.assign({},this.congressPresidentUpdateForm.value);
      newPresident.id=this.currentPresident.id;

      if (newPresident.congressPresidentName==this.currentPresident.congressPresidentName ) {
        this.toastrService.error("Kongre Başkanı Adı Eskisiyle Aynı","Güncelleme Yapılmadı");
        return;
      }

      this.congressPresidentService.updata(newPresident).subscribe(()=>{
        this.toastrService.success(this.currentPresident.congressPresidentName + "," +newPresident.congressPresidentName + " şeklinde güncellendi"," Güncellem başarılı" );
        this.closeUpdateModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Kongre Başkanı Güncellem Başarısız");
      })
    }else{
      this.toastrService.error("Kongre başkanı adı en az 2-50 arasında olmalıdır","Form geçersiz");
      this.congressPresidentUpdateForm.reset();
    }
  }

  closeUpdateModal(){
    this.updateModal.close();
  }

  createCongressPresidentUpdateForm(){
    this.congressPresidentUpdateForm=this.formService.createCongressPresidentForm();
  }

}
