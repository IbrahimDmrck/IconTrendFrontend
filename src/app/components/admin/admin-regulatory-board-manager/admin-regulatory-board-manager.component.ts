import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegulatoryBoard } from 'src/app/models/entities/regulatory-board';
import { RegulatoryBoardService } from 'src/app/services/regulatory-board.service';

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
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getRegulatoryBoard();
  }

  getRegulatoryBoard(){
    this.regulatoryBoardService.getRegulatoryBoards().subscribe(response=>{
      this.regulatoryBoards=response.data;
      this.DataLoadded=true;
      this.toastrService.success("İşlem Başarılı","Düzenleme Kurulları Listelendi");
    })
  }

}
