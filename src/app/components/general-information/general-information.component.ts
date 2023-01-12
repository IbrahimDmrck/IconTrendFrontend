import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { GeneralInformation } from 'src/app/models/entities/general-information';
import { GeneralInformationService } from 'src/app/services/general-information.service';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit {
generalInfo:GeneralInformation[];
  constructor(private generalSevice:GeneralInformationService) { }
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

    this.getGeneral();
  }
getGeneral(){
  this.generalSevice.getGeneralInfo().subscribe(response=>{
    this.generalInfo=response.data;

  })
}
}
