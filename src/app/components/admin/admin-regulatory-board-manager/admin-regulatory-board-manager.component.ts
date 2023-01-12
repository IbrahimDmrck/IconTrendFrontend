import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RegulatoryBoard } from 'src/app/models/entities/regulatory-board';
import { RegulatoryBoardService } from 'src/app/services/regulatory-board.service';
import { AdminRegulatoryBoardAddComponent } from '../admin-regulatory-board-add/admin-regulatory-board-add.component';
import { AdminRegulatoryBoardDeleteComponent } from '../admin-regulatory-board-delete/admin-regulatory-board-delete.component';
import { AdminRegulatoryBoardUpdateComponent } from '../admin-regulatory-board-update/admin-regulatory-board-update.component';

@Component({
  selector: 'app-admin-regulatory-board-manager',
  templateUrl: './admin-regulatory-board-manager.component.html',
  styleUrls: ['./admin-regulatory-board-manager.component.css']
})
export class AdminRegulatoryBoardManagerComponent implements OnInit {

  regulatoryBoards:RegulatoryBoard[];
  DataLoadded:boolean=false;

  constructor(
    private regulatoryBoardService:RegulatoryBoardService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getRegulatoryBoard();
  }

  getRegulatoryBoard(){
    this.regulatoryBoardService.getRegulatoryBoards().subscribe(response=>{
      this.regulatoryBoards=response.data;
      this.DataLoadded=true;
    })
  }

  showRegulatoryBoardUpdateModal(regulatoryBoard:RegulatoryBoard){
    const regulatoryBoardUpdateModal=this.dialog.open(AdminRegulatoryBoardUpdateComponent,{

      disableClose:true,
      width:'100%',
      height:'80%'
    });

    regulatoryBoardUpdateModal.componentInstance.currentRegulatoryBoard=regulatoryBoard;
    regulatoryBoardUpdateModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showRegulatoryBoardAddModal(){
    const regulatoryBoardAddModal=this.dialog.open(AdminRegulatoryBoardAddComponent,{
      disableClose:true,
      width:'100%',
      height:'80%'
    });
    regulatoryBoardAddModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showRegulatoryBoardDeleteModal(regulatoryBoard:RegulatoryBoard){
    const regulatoryBoardDeleteModal=this.dialog.open(AdminRegulatoryBoardDeleteComponent,{
      disableClose:true,
      width:'30%'
    });
    regulatoryBoardDeleteModal.componentInstance.deletedRegulatoryBoard=regulatoryBoard;
    regulatoryBoardDeleteModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

}
