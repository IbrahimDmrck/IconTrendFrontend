import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnounceImage } from 'src/app/models/entities/announce-image';
import { Announcement } from 'src/app/models/entities/announcement';
import { AnnouncementImageService } from 'src/app/services/announcement-image.service';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  announcement: Announcement[];
  announcementDataLoad: boolean = false;
  announceImages: AnnounceImage[];
  constructor(
    private announcementService: AnnouncementService,
    private announceImagesService: AnnouncementImageService
  ) { }

  ngOnInit(): void {
    this.getAnnouncement();
  }

  getAnnouncement() {
    this.announcementService.getAnnouncements().subscribe(response => {
      this.announcement = response.data;
      this.announcementDataLoad = true;

    })
  }

  getImage(announceImage:AnnounceImage){
    console.log(announceImage);
    return "https://localhost:44320/Uploads/Images/"+announceImage.imagePath;
  
  }

  getActiveString(announceImage:AnnounceImage){
    if(announceImage===this.announceImages[0]){
      return "active"
    }else{
      return ""
    }
  }

  getImagePath(imagePath: string) {
    console.log(imagePath);
    return this.announceImagesService.getImagePath(imagePath);

  }

}
