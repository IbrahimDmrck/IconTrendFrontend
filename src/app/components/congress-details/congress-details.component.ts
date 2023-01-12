import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { ToastrService } from 'ngx-toastr';
import { Kongre } from 'src/app/models/entities/kongre';
import { kongreImage } from 'src/app/models/entities/kongre-image';
import { RegulatoryBoard } from 'src/app/models/entities/regulatory-board';
import { ScienceBoard } from 'src/app/models/entities/science-board';
import { KongreImageService } from 'src/app/services/kongre-image.service';
import { KongreService } from 'src/app/services/kongre.service';
import { RegulatoryBoardService } from 'src/app/services/regulatory-board.service';
import { ScienceBoardService } from 'src/app/services/science-board.service';

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
    private activatedRoute:ActivatedRoute,
    private scienceService:ScienceBoardService,
    private regulatoryService:RegulatoryBoardService,
    private toastrService: ToastrService
    ) { }

    editorConfig: AngularEditorConfig = {
      editable: false,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
      translate: 'no',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      showToolbar: false,
      
     
    };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params['kongreId']) {
        this.getCurrentCongressDetailsByCongressId(params['kongreId']);
      }
    })
  }

  getCurrentCongressDetailsByCongressId(kongreId:number){
return new Promise<void>((resolve,_recejct)=>{
  this.kongreService.getKongreDetailsById(kongreId).subscribe((response)=>{
    this.currentCongress=response.data;
    this.DataLoadded=true;
    console.log(response.data);
    resolve();
  });
});

}


getImagePath(imagePath:string){
  return this.kongreImageService.getImagePath(imagePath);
}

getActiveString(carImage:kongreImage){
  if(carImage===this.congressImages[0]){
    return "active"
  }else{
    return ""
  }
}

getImage(kongreImage:kongreImage){
  return "https://localhost:44320/" + kongreImage.imagePath;

}


}
