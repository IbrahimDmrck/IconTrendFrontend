import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/models/entities/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-admin-contact-delete',
  templateUrl: './admin-contact-delete.component.html',
  styleUrls: ['./admin-contact-delete.component.css']
})
export class AdminContactDeleteComponent implements OnInit {
  deletedContact:Contact;
  constructor(
    private contactService:ContactService,
    private deleteContactModal:MatDialogRef<AdminContactDeleteComponent>,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(contact:Contact){
this.contactService.delete(contact).subscribe(response=>{
  this.toastrService.success(contact.nameSurname + " Mesajını Sildiniz", "Silme İşlemi başarılı")
  this.closeContactDeleteModal();
},errorResponse=>{
  this.toastrService.error(errorResponse.error.message,"Silme işlemi başarısız")
})
  }

  closeContactDeleteModal(){
    this.deleteContactModal.close();
  }

}
