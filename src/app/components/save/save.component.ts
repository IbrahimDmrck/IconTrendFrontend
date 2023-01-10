import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.getSave();
  }

  getSave(){
    this.saveService.getSave().subscribe(response=>{
      this.saves=response.data;
    })
  }


}
