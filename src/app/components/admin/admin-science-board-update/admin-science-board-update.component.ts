import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RegulatoryBoard } from 'src/app/models/entities/regulatory-board';
import { ScienceBoard } from 'src/app/models/entities/science-board';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { ScienceBoardService } from 'src/app/services/science-board.service';

@Component({
  selector: 'app-admin-science-board-update',
  templateUrl: './admin-science-board-update.component.html',
  styleUrls: ['./admin-science-board-update.component.css']
})
export class AdminScienceBoardUpdateComponent implements OnInit {
  currentScienceBoard:ScienceBoard;
  scienceBoardUpdateForm:FormGroup
  constructor(
    private scienceBoardService:ScienceBoardService,
    private toastrService:ToastrService,
    private updateModal:MatDialogRef<AdminScienceBoardUpdateComponent>,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createScienceBoardUpdateForm();
  }

  update(){
    if (this.scienceBoardUpdateForm.valid) {
      let newScienceBoard=Object.assign({},this.scienceBoardUpdateForm.value);
      newScienceBoard.id=this.currentScienceBoard.id;

      if (newScienceBoard.scienceBoardMemberName==this.currentScienceBoard.scienceBoardMemberName) {
        this.toastrService.error("Bilim kurulu üyelerinde bir değişiklik yapmadınız","Güncellem yapılmadı");
        return;
      }
      this.scienceBoardService.update(newScienceBoard).subscribe(()=>{
        this.toastrService.success("Bilim Kurulu Güncellendi","Güncellem Başarılı");
        this.closeUpdateModal();
      },errorResponse=>{
        this.errorService.showBackendError(errorResponse,"Bilim kurulu Güncelleme Başarısız");
      })
    }else{
      this.toastrService.error("Bilim kurulu adı 2-50 arasında olmalı","Form geçersiz");
    }

    
  }

  closeUpdateModal(){
    this.updateModal.close();
  }

  createScienceBoardUpdateForm(){
    this.scienceBoardUpdateForm=this.formService.createScienceBoardForm();
  }

}
