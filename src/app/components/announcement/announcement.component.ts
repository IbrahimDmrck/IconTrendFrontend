import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/models/entities/announcement';
import { AnnouncementImageService } from 'src/app/services/announcement-image.service';
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
    private announceImagesService:AnnouncementImageService
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

  getImagePath(imagePath:string){
  return this.announceImagesService.getImagePath(imagePath);

  }

}
