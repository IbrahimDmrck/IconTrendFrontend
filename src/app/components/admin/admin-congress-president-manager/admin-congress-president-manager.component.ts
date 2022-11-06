import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CongressPresident } from 'src/app/models/entities/congress-president';
import { CongressPresidentService } from 'src/app/services/congress-president.service';

@Component({
  selector: 'app-admin-congress-president-manager',
  templateUrl: './admin-congress-president-manager.component.html',
  styleUrls: ['./admin-congress-president-manager.component.css']
})
export class AdminCongressPresidentManagerComponent implements OnInit {

  congressPresidents:CongressPresident[];
  DataLoaded:boolean=false;

  constructor(
    private congressPresidentService:CongressPresidentService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getCongressPresident();
  }

  getCongressPresident(){
    this.congressPresidentService.getCongressPresidents().subscribe(response=>{
      this.congressPresidents=response.data;
      this.DataLoaded=true;
      this.toastrService.success("İşlem Başarılı","Kongre Başkanları Listelendi");
    })
  }
}
