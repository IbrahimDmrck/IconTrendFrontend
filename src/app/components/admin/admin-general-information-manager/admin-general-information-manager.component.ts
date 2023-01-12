import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralInformation } from 'src/app/models/entities/general-information';
import { GeneralInformationService } from 'src/app/services/general-information.service';
import { AdminGeneralInformationAddComponent } from '../admin-general-information-add/admin-general-information-add.component';
import { AdminGeneralInformationDeleteComponent } from '../admin-general-information-delete/admin-general-information-delete.component';
import { AdminGeneralInformationUpdateComponent } from '../admin-general-information-update/admin-general-information-update.component';

@Component({
  selector: 'app-admin-general-information-manager',
  templateUrl: './admin-general-information-manager.component.html',
  styleUrls: ['./admin-general-information-manager.component.css']
})
export class AdminGeneralInformationManagerComponent implements OnInit {
generalInformations:GeneralInformation[];
DataLoad:boolean=false;
  constructor(
    private generalInformationService:GeneralInformationService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getGeneralInformation();
  }

 getGeneralInformation(){
  this.generalInformationService.getGeneralInfo().subscribe(response=>{
    this.generalInformations=response.data;
    this.DataLoad=true;
  })
 }

  showGeneralInfoDeleteModal(genralInfo:GeneralInformation){
    const genralInfoDeleteModal=this.dialog.open(AdminGeneralInformationDeleteComponent,{
      disableClose:true,
      width:'100%',
      height:'40%'
    });

    genralInfoDeleteModal.componentInstance.deletedGeneralInfo=genralInfo;
    genralInfoDeleteModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    }) 
  }
 
  showGeneralInfoUpdateModal(genralInfo:GeneralInformation){
    const generalInfoUpdateModal=this.dialog.open(AdminGeneralInformationUpdateComponent,{

      disableClose:true,
      width:'100%',
      height:'80%'
    });

    generalInfoUpdateModal.componentInstance.currentGeneralInfo=genralInfo;
    generalInfoUpdateModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

  showGeneralInfoAddModal(){
    const generalInfoAddModal=this.dialog.open(AdminGeneralInformationAddComponent,{
      disableClose:true,
      width:'100%',
      height:'80%'
    });
    generalInfoAddModal.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }

}
 