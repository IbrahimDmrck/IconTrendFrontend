import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { RegulatoryBoardService } from 'src/app/services/regulatory-board.service';

@Component({
  selector: 'app-admin-regulatory-board-add',
  templateUrl: './admin-regulatory-board-add.component.html',
  styleUrls: ['./admin-regulatory-board-add.component.css']
})
export class AdminRegulatoryBoardAddComponent implements OnInit {
regulatoryBoardAddForm:FormGroup
  constructor(
    private regulatoryBoardService:RegulatoryBoardService,
    private toastrService:ToastrService,
    private regulatoryBoardAddModal:MatDialogRef<AdminRegulatoryBoardAddComponent>,
    private errorService:ErrorService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this. createRegulatoryBoardAddForm();
  }

  createRegulatoryBoardAddForm(){
    this.regulatoryBoardAddForm=this.formService.createRegulatoryBoardForm();
  }

  closeRegulatoryBoardAddModal(){
    this.regulatoryBoardAddModal.close();
  }

  add(){
    if (this.regulatoryBoardAddForm.valid) {
      let regulatoryBoardModel=Object.assign({},this.regulatoryBoardAddForm.value);
      this.regulatoryBoardService.add(regulatoryBoardModel).subscribe(()=>{
        this.toastrService.success(regulatoryBoardModel.regulatoryBoardMembername,"Düzenleme Kurulu Eklendi");
        this.closeRegulatoryBoardAddModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Düzenleme Kurulu Eklenemedi");
      })
    }else{
      this.toastrService.error("Düzenleme kurulu üye adı 2-50 karakter arasında olmalıdır","Fomr Geçersiz");
      this.regulatoryBoardAddForm.reset();
    }
  }
}
 