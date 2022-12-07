import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ScienceBoard } from 'src/app/models/entities/science-board';
import { ScienceBoardService } from 'src/app/services/science-board.service';
import { AdminScienceBoardAddComponent } from '../admin-science-board-add/admin-science-board-add.component';
import { AdminScienceBoardDeleteComponent } from '../admin-science-board-delete/admin-science-board-delete.component';
import { AdminScienceBoardUpdateComponent } from '../admin-science-board-update/admin-science-board-update.component';

@Component({
  selector: 'app-admin-science-board-manager',
  templateUrl: './admin-science-board-manager.component.html',
  styleUrls: ['./admin-science-board-manager.component.css']
})
export class AdminScienceBoardManagerComponent implements OnInit {

  scienceBoards:ScienceBoard[];
  DataLoadded:boolean=false;

  constructor(
    private scienceBoardService:ScienceBoardService,
    private dialog:MatDialog
  
  ) { }

  ngOnInit(): void {
    this.getScienceBoard();
  }

  getScienceBoard(){
    this.scienceBoardService.getScienceBoards().subscribe(response=>{
      this.scienceBoards=response.data;
      this.DataLoadded=true;
    })

  }

  showScienceBoardUpdateModal(scienceBoard:ScienceBoard){
    const scienceBoardUpdateModal=this.dialog.open(AdminScienceBoardUpdateComponent,{

      disableClose:true,
      width:'50%'
    });

    scienceBoardUpdateModal.componentInstance.currentScienceBoard=scienceBoard;
    scienceBoardUpdateModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showScienceBoardAddModal(){
    const scienceBoardAddModal=this.dialog.open(AdminScienceBoardAddComponent,{
      disableClose:true,
      width:'30%'
    });
    scienceBoardAddModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showScienceBoardDeleteModal(scienceBoard:ScienceBoard){
    const scienceBoardDeleteModal=this.dialog.open(AdminScienceBoardDeleteComponent,{
      disableClose:true,
      width:'30%'
    });
    scienceBoardDeleteModal.componentInstance.deletedScienceBoard=scienceBoard;
    scienceBoardDeleteModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
}
