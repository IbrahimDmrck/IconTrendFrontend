import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from 'src/app/models/entities/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-see-all-announce',
  templateUrl: './see-all-announce.component.html',
  styleUrls: ['./see-all-announce.component.css']
})
export class SeeAllAnnounceComponent implements OnInit {

  announcements:Announcement[];
  announceDataLoad:boolean=false;
  constructor(
    private announcementService:AnnouncementService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllAnnounce();
  }

  getAllAnnounce(){
    this.announcementService.getAnnouncements().subscribe(response=>{
      this.announcements=response.data;
      this.announceDataLoad=true;
    })
  }

}
