import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/entities/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-manager',
  templateUrl: './admin-user-manager.component.html',
  styleUrls: ['./admin-user-manager.component.css']
})
export class AdminUserManagerComponent implements OnInit {

  users:User[];

  constructor(
    private userService:UserService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
this.userService.getUsers().subscribe(response=>{
  this.users=response.data;
  this.toastrService.success("İşlem Başarılı","Kullanıcılar Listelendi");
})
  }

}
