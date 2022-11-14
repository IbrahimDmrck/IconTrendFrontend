import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { ScienceBoardService } from 'src/app/services/science-board.service';

@Component({
  selector: 'app-admin-science-board-add',
  templateUrl: './admin-science-board-add.component.html',
  styleUrls: ['./admin-science-board-add.component.css']
})
export class AdminScienceBoardAddComponent implements OnInit {
scienceBoardAddForm:FormGroup
  constructor(
    private scienceBoardService:ScienceBoardService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService: FormService,
    private scienceBoardAddModal:MatDialogRef<AdminScienceBoardAddComponent>

  ) { }

  ngOnInit(): void {
    this.createScienceBoardAddForm();
  }

  createScienceBoardAddForm(){
    this.scienceBoardAddForm=this.formService.createScienceBoardForm();
  }

  closeScienceBoardAddModal(){
    this.scienceBoardAddModal.close();
  }

  add(){
    if (this.scienceBoardAddForm.valid) {
      let scienceBoardModel=Object.assign({},this.scienceBoardAddForm.value);
      this.scienceBoardService.add(scienceBoardModel).subscribe(()=>{
        this.toastrService.success(scienceBoardModel.scienceBoardMembername,"Bilim Kurulu Eklendi");
        this.closeScienceBoardAddModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Bilim Kurulu Eklenemedi");
      })
    }else{
      this.toastrService.error("Bilim kurulu üye adı 2-50 karakter arasında olmalıdır","Fomr Geçersiz");
      this.scienceBoardAddForm.reset();
    }
  }
}
