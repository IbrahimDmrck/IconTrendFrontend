import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CongressImage } from 'src/app/models/entities/congress-image';
import { CongressDetailDto } from 'src/app/models/entities/congressDetailDTos';
import { CongressDetailsService } from 'src/app/services/congress-details.service';
import { CongressImageService } from 'src/app/services/congress-image.service';

@Component({
  selector: 'app-congress-details',
  templateUrl: './congress-details.component.html',
  styleUrls: ['./congress-details.component.css']
})
export class CongressDetailsComponent implements OnInit {

  congressDetails:CongressDetailDto;
  congressImages:CongressImage[];

  constructor(
    private congressDetailService:CongressDetailsService,
    private congressImageService:CongressImageService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["congressId"]) {
        this.getCongressDetailsByCongressId(params["congressId"]);
      }
    })
  }

getCongressDetailsByCongressId(congressId:number){
return new Promise<void>((resolve,recejct)=>{
  this.congressDetailService.getCongressDetails(congressId).subscribe((response)=>{
    this.congressDetails=response.data;
    resolve();
  });
});
}

getImagePath(imagePath:string){
  return this.congressImageService.getImagePath(imagePath);
}
}
