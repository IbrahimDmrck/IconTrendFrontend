import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn } from 'rxjs';
import { Announcement } from 'src/app/models/entities/announcement';
import { AnnouncementImageService } from 'src/app/services/announcement-image.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AdminAnnouncementAddComponent } from '../admin-announcement-add/admin-announcement-add.component';
import { AdminAnnouncementDeleteComponent } from '../admin-announcement-delete/admin-announcement-delete.component';
import { AdminAnnouncementUpdateComponent } from '../admin-announcement-update/admin-announcement-update.component';
 
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
    private announceImageService:AnnouncementImageService,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.getAnnouncement();
    
  }

  getAnnouncement(){
    this.announcementService.getAnnouncements().subscribe(response=>{
      this.announcements=response.data;
      this.announceDataLoad=true;
      
    })
  }


  getImagePath(imagePath:String){
    return this.announceImageService.getImagePath(imagePath);
  }

  showAnnounceUpdateModal(announce:Announcement){
    const announceUpdateModal=this.dialog.open(AdminAnnouncementUpdateComponent,{
      disableClose:true,
      width: '100%',
      height:'80%'
    });
    announceUpdateModal.componentInstance.currentAnnounce=announce;
    announceUpdateModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showAnnounceDeleteModal(announce: Announcement) {
    const announceDeleteModal = this.dialog.open(AdminAnnouncementDeleteComponent, {
      disableClose: true,
      width: "100%"
    });
    announceDeleteModal.componentInstance.deletedAnnounce = announce;

    announceDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showAnnounceAddModal() {
    const announceAddModal = this.dialog.open(AdminAnnouncementAddComponent, {
      disableClose: true,
      width: '100%',
      height:'80%'
    });

    announceAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
