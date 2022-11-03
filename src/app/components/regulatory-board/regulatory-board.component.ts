import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegulatoryBoard } from 'src/app/models/entities/regulatory-board';
import { RegulatoryBoardService } from 'src/app/services/regulatory-board.service';

@Component({
  selector: 'app-regulatory-board',
  templateUrl: './regulatory-board.component.html',
  styleUrls: ['./regulatory-board.component.css']
})
export class RegulatoryBoardComponent implements OnInit {

  regulatoryBoard:RegulatoryBoard[];
  dataLoaded:boolean=false;
  constructor(
    private regulatoryBoardService:RegulatoryBoardService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getRegulatoryBoard();
  }

  getRegulatoryBoard(){
    this.regulatoryBoardService.getRegulatoryBoards().subscribe(response=>{
      this.regulatoryBoard=response.data;
      this.dataLoaded=true;
    })
  }
}
