import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RegulatoryBoard } from 'src/app/models/entities/regulatory-board';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { RegulatoryBoardService } from 'src/app/services/regulatory-board.service';

@Component({
  selector: 'app-admin-regulatory-board-update',
  templateUrl: './admin-regulatory-board-update.component.html',
  styleUrls: ['./admin-regulatory-board-update.component.css']
})
export class AdminRegulatoryBoardUpdateComponent implements OnInit {
  currentRegulatoryBoard:RegulatoryBoard;
  regulatoryBoardUpdateForm:FormGroup
  constructor(
    private regulatoryBoardService:RegulatoryBoardService,
    private toastrService:ToastrService,
    private updateModal:MatDialogRef<AdminRegulatoryBoardUpdateComponent>,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createRegulatoryBoardUpdateForm();
  }

  update(){
    if (this.regulatoryBoardUpdateForm.valid) {
      let newRegulatoryBoard=Object.assign({},this.regulatoryBoardUpdateForm.value);
      newRegulatoryBoard.id=this.currentRegulatoryBoard.id;

      if (newRegulatoryBoard.regulatoryBoardMemberName==this.currentRegulatoryBoard.regulatoryBoardMemberName) {
        this.toastrService.error("Düzenleme kurulu üyelerinde bir değişiklik yapmadınız","Güncellem yapılmadı");
        return;
      }
      this.regulatoryBoardService.update(newRegulatoryBoard).subscribe(()=>{
        this.toastrService.success("Düzenleme Kurulu Güncellendi","Güncellem Başarılı");
        this.closeUpdateModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Düzenleme kurulu Güncelleme Başarısız");
      })
    }else{
      this.toastrService.error("Düzenleme kurulu adı 2-50 arasında olmalı","Form geçersiz");
    }

    
  }

  closeUpdateModal(){
    this.updateModal.close();
  }

  createRegulatoryBoardUpdateForm(){
    this.regulatoryBoardUpdateForm=this.formService.createRegulatoryBoardForm();
  }

}
