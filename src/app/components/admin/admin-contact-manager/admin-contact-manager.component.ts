import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from 'src/app/models/entities/contact';
import { ContactService } from 'src/app/services/contact.service';
import { AdminContactDeleteComponent } from '../admin-contact-delete/admin-contact-delete.component';
import { AdminShowContactComponent } from '../admin-show-contact/admin-show-contact.component';

@Component({
  selector: 'app-admin-contact-manager',
  templateUrl: './admin-contact-manager.component.html',
  styleUrls: ['./admin-contact-manager.component.css']
})
export class AdminContactManagerComponent implements OnInit {
contacts:Contact[];
DataLoadded:boolean=false;
  constructor(private contactService:ContactService,private dialog:MatDialog) { }
 
  ngOnInit(): void {
    this.getContact();
  }
  getContact(){
    this.contactService.getContact().subscribe(response=>{
      this.contacts=response.data;
      this.DataLoadded=true;
    })
  }

//   showContactModal(contact:Contact){
// const contactShowModal=this.dialog.open(AdminShowContactComponent,{
//   disableClose:true,
//   width:'70%'
// });

// contactShowModal.componentInstance.currentContact=contact;
// contactShowModal.afterClosed().subscribe(result=>{
// this.ngOnInit();
// })
//   }

  showContactDeleteModal(contact:Contact){
    const contactDeleteModal=this.dialog.open(AdminContactDeleteComponent,{
      disableClose:true,
      width:'50%'
    });

    contactDeleteModal.componentInstance.deletedContact=contact;
    contactDeleteModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
}
