import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from 'src/app/models/entities/announcement';
import { Congress } from 'src/app/models/entities/congress';
import { CongressDetailDto } from 'src/app/models/entities/congressDetailDTos';
import { ScienceBoard } from 'src/app/models/entities/science-board';
import { Topic } from 'src/app/models/entities/topic';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { CongressDetailsService } from 'src/app/services/congress-details.service';
import { CongressImageService } from 'src/app/services/congress-image.service';
import { CongressService } from 'src/app/services/congress.service';
import { ScienceBoardService } from 'src/app/services/science-board.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
congressDetailDtos:CongressDetailDto[];

  congress:Congress[];
  scienceBoard:ScienceBoard[];

  congressDataLoaded:boolean=false;
  scienceBoardDataLoaded:boolean=false;

  maxRandomCongressLength:number=5;
  randomCongress:Congress[]=[];

  routerLink:string="";

  constructor(
    private congressService:CongressService,
    private scienceBoardService:ScienceBoardService,
    private congressImageService:CongressImageService,
    private router:Router
  ) { }

  ngOnInit(): void {  
        this.getCongress(); 
        this.getScienceBoard();
  }


  getCongress() {
    this.congressService.getCongress().subscribe(response=>{
      this.congress = response.data
      this.congressDataLoaded = true;
    })   
  }



  getScienceBoard(){
    this.scienceBoardService.getScienceBoards().subscribe(response=>{
      this.scienceBoard=response.data;
      this.scienceBoardDataLoaded=true;
    })
  }

  getImagePath(imagePath:string){
    return this.congressImageService.getImagePath(imagePath);
  }

}
