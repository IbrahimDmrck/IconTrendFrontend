import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { Save } from 'src/app/models/entities/save';
import { SaveService } from 'src/app/services/save.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
saves:Save[];
  constructor(
    private saveService:SaveService
  ) { }

  editor: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    maxHeight: 'auto',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    enableToolbar:false,
    showToolbar:false,
    


   
  };

  ngOnInit(): void {
    this.getSave();
  }

  getSave(){
    this.saveService.getSave().subscribe(response=>{
      this.saves=response.data;
    })
  }


}
