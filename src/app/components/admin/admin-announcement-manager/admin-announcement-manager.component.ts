import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn } from 'rxjs';
import { Announcement } from 'src/app/models/entities/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-admin-announcement-manager',
  templateUrl: './admin-announcement-manager.component.html',
  styleUrls: ['./admin-announcement-manager.component.css']
})
export class AdminAnnouncementManagerComponent implements OnInit {

  announcements:Announcement[];
  announceDataLoad:boolean=false;
  constructor(
    private announcementService:AnnouncementService,
    private toastrSservice:ToastrService
    ) { }

  ngOnInit(): void {
    this.getAnnouncement();
  }

  getAnnouncement(){
    this.announcementService.getAnnouncements().subscribe(response=>{
      this.announcements=response.data;
      this.announceDataLoad=true;
      this.toastrSservice.success("İşlem Başarılı","Duyurular Listelendi");
    })
  }
}
