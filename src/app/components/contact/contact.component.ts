import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/services/contact.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
contactAddForm:FormGroup
  constructor(
    private contactService:ContactService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createContactAddForm();
  }

  createContactAddForm(){
    this.contactAddForm=this.formService.createContactForm();
  }

  add(){
    if (this.contactAddForm.valid) {
      let contact=Object.assign({},this.contactAddForm.value);
      this.contactService.add(contact).subscribe(()=>{
        this.toastrService.success(contact.NameSurname,"Mesajınız İletildi");
      },errorResponse=>{this.errorService.showBackendError(errorResponse,"Mesajınız İletilemedi");
    })
    }else{
      this.toastrService.error("Form Geçersiz")
      this.contactAddForm.reset();
    }
  }

}
