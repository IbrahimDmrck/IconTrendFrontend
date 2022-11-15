import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Announcement } from 'src/app/models/entities/announcement';
import { AnnouncementImageService } from 'src/app/services/announcement-image.service';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-admin-announcement-delete',
  templateUrl: './admin-announcement-delete.component.html',
  styleUrls: ['./admin-announcement-delete.component.css']
})
export class AdminAnnouncementDeleteComponent implements OnInit {
deletedAnnounce:Announcement;
  constructor(
    private announceDeleteModal:MatDialogRef<AdminAnnouncementDeleteComponent>,
    private announceImageService:AnnouncementImageService,
    private announceSercevice:AnnouncementService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(announce:Announcement){
    this.announceSercevice.delete(announce).subscribe(response0=>{
      this.toastrService.success(announce.announceTitle +" Silindi" ,"Silme işlemi başarılı");
      this.closeAnnounceDeleteModal();
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız");
    })
  }

  getImagePath(imagePath:string){
    return this.announceImageService.getImagePath(imagePath);
  }

  closeAnnounceDeleteModal(){
    this.announceDeleteModal.close();
  }
}
