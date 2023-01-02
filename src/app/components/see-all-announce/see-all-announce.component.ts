import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnounceImage } from 'src/app/models/entities/announce-image';
import { Announcement } from 'src/app/models/entities/announcement';
import { AnnouncementImageService } from 'src/app/services/announcement-image.service';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-see-all-announce',
  templateUrl: './see-all-announce.component.html',
  styleUrls: ['./see-all-announce.component.css']
})
export class SeeAllAnnounceComponent implements OnInit {

  announcements:Announcement[]=[];
  announceDataLoad:boolean=false;

  
  constructor(
    private announcementService:AnnouncementService,
    private announceImageService:AnnouncementImageService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllAnnounce();
  }

  getAllAnnounce(){
    this.announcementService.getAnnouncementsWithDetails().subscribe(response=>{
      this.announcements=response.data;
      this.announceDataLoad=true;
    })
  }
 
  getImage(announceImage:Announcement){
    return "https://localhost:44320/"+announceImage.announceImages[0].imagePath; 
  }

}
  



