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

  announcements: Announcement[]=[];
  announcementDataLoad: boolean = false;
  
  constructor(
    private announcementService: AnnouncementService,
    private announceImagesService: AnnouncementImageService
  ) { }

  ngOnInit(): void {
    this.getAnnouncement();
  }

  getAnnouncement() {
    this.announcementService.getAnnouncementsWithDetails().subscribe(response => {
      this.announcements = response.data;
      this.announcementDataLoad = true;

    })
  }

  getImage(announceImage:Announcement){
    return "https://localhost:44320/"+announceImage.announceImages[0].imagePath;
  }



  getImagePath(imagePath: string) {
    console.log(imagePath);
    return this.announceImagesService.getImagePath(imagePath);

  }

}
