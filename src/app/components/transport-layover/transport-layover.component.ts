import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { TransportLayover } from 'src/app/models/entities/transport-layover';
import { TransportLayoverService } from 'src/app/services/transport-layover.service';

@Component({
  selector: 'app-transport-layover',
  templateUrl: './transport-layover.component.html',
  styleUrls: ['./transport-layover.component.css']
})
export class TransportLayoverComponent implements OnInit {

  transpotLayovers:TransportLayover[];
  transportdataloaded:boolean=false;
  constructor(private transportLayoverService:TransportLayoverService
    ) { }

    editor: AngularEditorConfig = {
      editable: false,
      spellcheck: true,
      maxHeight: 'auto',
      width:'100%',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
      translate: 'no',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      showToolbar:false
     
    };

  ngOnInit(): void {
    this.getAllTransportLayover();
  }
getAllTransportLayover(){
  this.transportLayoverService.getTransportLayovers().subscribe(response=>{
    this.transpotLayovers=response.data;
    this.transportdataloaded=true;
  })
}
}
