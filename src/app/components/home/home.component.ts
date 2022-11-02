import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from 'src/app/models/entities/announcement';
import { Congress } from 'src/app/models/entities/congress';
import { Topic } from 'src/app/models/entities/topic';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { CongressImageService } from 'src/app/services/congress-image.service';
import { CongressService } from 'src/app/services/congress.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  congress:Congress[];


  congressDataLoaded:boolean=false;

  maxRandomCongressLength:number=5;
  randomCongress:Congress[]=[];

  routerLink:string="";

  constructor(
    private congressService:CongressService,
   
    private activatedRoute:ActivatedRoute,
   
    private topicService:TopicService

  ) { }

  ngOnInit(): void {
   
      if (this.routerLink=='') {
        this.getCongress();
      }
    
  
    
  }
  getCongress() {
    throw new Error('Method not implemented.');
  }

  getProducts() {
    this.congressService.getCongress().subscribe(response=>{
      this.congress = response.data
      this.congressDataLoaded = true;
    })   
  }

}
