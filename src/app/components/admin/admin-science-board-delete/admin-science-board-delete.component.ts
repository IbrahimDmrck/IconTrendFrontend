import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScienceBoard } from 'src/app/models/entities/science-board';
import { ScienceBoardService } from 'src/app/services/science-board.service';

@Component({
  selector: 'app-admin-science-board-delete',
  templateUrl: './admin-science-board-delete.component.html',
  styleUrls: ['./admin-science-board-delete.component.css']
})
export class AdminScienceBoardDeleteComponent implements OnInit {
  deletedScienceBoard:ScienceBoard;
  constructor(
    private deleteScienceBoardModal:MatDialogRef<AdminScienceBoardDeleteComponent>,
    private scienceBoardService:ScienceBoardService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(scienceBoard:ScienceBoard){
    this.scienceBoardService.delete(scienceBoard).subscribe(response=>{
      this.toastrService.success(scienceBoard.scienceBoardMemberName + " Düzenleme kurulu silindi","Silme işlemi başarılı")
      this.closeScienceBoardDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız")
    })
  }

  closeScienceBoardDeleteModal(){
    this.deleteScienceBoardModal.close();
  }

}
