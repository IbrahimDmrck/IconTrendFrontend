import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransportLayover } from 'src/app/models/entities/transport-layover';
import { TransportLayoverService } from 'src/app/services/transport-layover.service';

@Component({
  selector: 'app-admin-transport-layover-manager',
  templateUrl: './admin-transport-layover-manager.component.html',
  styleUrls: ['./admin-transport-layover-manager.component.css']
})
export class AdminTransportLayoverManagerComponent implements OnInit {

  transportlayovers:TransportLayover[];
  DataLoadded:boolean=false;

  constructor(
    private transportLayoverService:TransportLayoverService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getTransportLayover();
  }

  getTransportLayover(){
    this.transportLayoverService.getTransportLayovers().subscribe(response=>{
      this.transportlayovers=response.data;
      this.DataLoadded=true;
      this.toastrService.success("İşlem Başarılı","Ulaşım ve Konaklama Bilgileri Listelendi");
    })
  }
}
