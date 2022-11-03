import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/models/entities/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  announcement:Announcement[];
  announcementDataLoad:boolean=false;
  constructor(
    private announcementService:AnnouncementService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAnnouncement();
  }

  getAnnouncement(){
this.announcementService.getAnnouncements().subscribe(response=>{
  this.announcement=response.data;
  this.announcementDataLoad=true;

})
  }

}
