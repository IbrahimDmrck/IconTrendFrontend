import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Congress } from 'src/app/models/entities/congress';
import { CongressImage } from 'src/app/models/entities/congress-image';
import { CongressDetailDto } from 'src/app/models/entities/congressDetailDTos';
import { Kongre } from 'src/app/models/entities/kongre';
import { kongreImage } from 'src/app/models/entities/kongre-image';
import { CongressDetailsService } from 'src/app/services/congress-details.service';
import { CongressImageService } from 'src/app/services/congress-image.service';
import { CongressService } from 'src/app/services/congress.service';
import { KongreImageService } from 'src/app/services/kongre-image.service';
import { KongreService } from 'src/app/services/kongre.service';

@Component({
  selector: 'app-congress-details',
  templateUrl: './congress-details.component.html',
  styleUrls: ['./congress-details.component.css']
})
export class CongressDetailsComponent implements OnInit {

  currentCongress:Kongre;
  DataLoadded:boolean=false;

  congressImages:kongreImage[];

  constructor(
    private kongreService:KongreService,
    private kongreImageService:KongreImageService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["congressId"]) {
        this.getCongressDetailsByCongressId(params["congressId"]);
      }
    })
  }

getCongressDetailsByCongressId(kongreId:number){
return new Promise<void>((resolve,recejct)=>{
  this.kongreService.getKongreDetails(kongreId).subscribe((response)=>{
    this.currentCongress=response.data;
    this.DataLoadded=true;
    resolve();
    console.log(this.currentCongress.kongreBaskani);
  });
});

}

getImagePath(imagePath:string){
  return this.kongreImageService.getImagePath(imagePath);
}
}
