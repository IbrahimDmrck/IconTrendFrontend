import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CongressPresidentService } from 'src/app/services/congress-president.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-admin-congress-president-add',
  templateUrl: './admin-congress-president-add.component.html',
  styleUrls: ['./admin-congress-president-add.component.css']
})
export class AdminCongressPresidentAddComponent implements OnInit {

  congressPresidentAddForm:FormGroup;

  constructor(
    private congressPresidentService:CongressPresidentService,
    private toastrService:ToastrService,
    private presidentAddModal:MatDialogRef<AdminCongressPresidentAddComponent>,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createCongressPresidentAddForm();
  }

  createCongressPresidentAddForm(){
    this.congressPresidentAddForm=this.formService.createCongressPresidentForm();
  }

  closeCongressPresidentAddModal(){
    this.presidentAddModal.close();
  }

  add() {
    if (this.congressPresidentAddForm.valid) {
      let congressPresidentModel = Object.assign({}, this.congressPresidentAddForm.value);
      this.congressPresidentService.add(congressPresidentModel).subscribe(() => {
        this.toastrService.success(congressPresidentModel.name,"Kongre Başkanı  Eklendi");
        this.closeCongressPresidentAddModal();
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Kongre Başkanı Eklenemedi");
      })
    } else {
      this.toastrService.error("Konge başkanı adı 2-50 karakter arasında olmalıdır","Geçersiz form");
      this.congressPresidentAddForm.reset();
    }
  }

  /*
  

  */

}
