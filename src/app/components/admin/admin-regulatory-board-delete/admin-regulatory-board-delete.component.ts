import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RegulatoryBoard } from 'src/app/models/entities/regulatory-board';
import { RegulatoryBoardService } from 'src/app/services/regulatory-board.service';

@Component({
  selector: 'app-admin-regulatory-board-delete',
  templateUrl: './admin-regulatory-board-delete.component.html',
  styleUrls: ['./admin-regulatory-board-delete.component.css']
})
export class AdminRegulatoryBoardDeleteComponent implements OnInit {
  deletedRegulatoryBoard:RegulatoryBoard;
  constructor(
    private deleteRegulatoryBoardModal:MatDialogRef<AdminRegulatoryBoardDeleteComponent>,
    private regulatoryBoardService:RegulatoryBoardService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(regulatoryBoard:RegulatoryBoard){
    this.regulatoryBoardService.delete(regulatoryBoard).subscribe(response=>{
      this.toastrService.success(regulatoryBoard.regulatoryBoardMemberName + " Düzenleme kurulu silindi","Silme işlemi başarılı")
      this.closeRegulatoryBoardDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız")
    })
  }

  closeRegulatoryBoardDeleteModal(){
    this.deleteRegulatoryBoardModal.close();
  }

}
