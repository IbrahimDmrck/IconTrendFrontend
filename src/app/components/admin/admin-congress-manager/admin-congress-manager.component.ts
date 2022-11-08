import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Congress } from 'src/app/models/entities/congress';
import { CongressImage } from 'src/app/models/entities/congress-image';
import { CongressImageService } from 'src/app/services/congress-image.service';
import { CongressService } from 'src/app/services/congress.service';

@Component({
  selector: 'app-admin-congress-manager',
  templateUrl: './admin-congress-manager.component.html',
  styleUrls: ['./admin-congress-manager.component.css']
})
export class AdminCongressManagerComponent implements OnInit {

  
  congresses:Congress[];
  congressDataLoad:boolean=false;
  congressImages:CongressImage[];

  constructor(
    private congressService:CongressService,
    private congressImageService:CongressImageService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getCongress();
  }

  getCongress(){
    this.congressService.getCongress().subscribe(response=>{
      this.congresses=response.data;
      this.congressDataLoad=true;
      this.toastrService.success("İşlen Başarılı","Kongreler Listelendi");
    })
  }

  getImagePath(imagePath:string){
    return this.congressImageService.getImagePath(imagePath);
  }

}
