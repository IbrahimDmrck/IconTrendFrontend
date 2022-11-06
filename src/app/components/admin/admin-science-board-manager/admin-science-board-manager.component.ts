import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ScienceBoard } from 'src/app/models/entities/science-board';
import { ScienceBoardService } from 'src/app/services/science-board.service';

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
    private toastrService:ToastrService
  
  ) { }

  ngOnInit(): void {
    this.getScienceBoard();
  }

  getScienceBoard(){
    this.scienceBoardService.getScienceBoards().subscribe(response=>{
      this.scienceBoards=response.data;
      this.DataLoadded=true;
     this.toastrService.success("İşlem Başarılı","Bilim Kurulları Listelendi");
    })

  }
}
