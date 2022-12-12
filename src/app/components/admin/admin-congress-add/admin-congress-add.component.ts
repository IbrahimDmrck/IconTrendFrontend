import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Announcement } from 'src/app/models/entities/announcement';
import { CongressPresident } from 'src/app/models/entities/congress-president';
import { RegulatoryBoard } from 'src/app/models/entities/regulatory-board';
import { ScienceBoard } from 'src/app/models/entities/science-board';
import { Topic } from 'src/app/models/entities/topic';
import { UploadFile } from 'src/app/models/uploadFile';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { CongressImageService } from 'src/app/services/congress-image.service';
import { CongressPresidentService } from 'src/app/services/congress-president.service';
import { CongressService } from 'src/app/services/congress.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { RegulatoryBoardService } from 'src/app/services/regulatory-board.service';
import { ScienceBoardService } from 'src/app/services/science-board.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-admin-congress-add',
  templateUrl: './admin-congress-add.component.html',
  styleUrls: ['./admin-congress-add.component.css']
})
export class AdminCongressAddComponent implements OnInit {
congressAddForm:FormGroup;
congressPresidents:CongressPresident[];
regulatoryBoards:RegulatoryBoard[];
scienceBoards:ScienceBoard[];
topics:Topic[];

congressImagesFiles:UploadFile[]=[];
congressImagesPaths:any[]=[]

  constructor(
    private congressService:CongressService,
    private congressAddModal:MatDialogRef<AdminCongressAddComponent>,
    private congressPresidentService:CongressPresidentService,
    private regulatoryBoardService:RegulatoryBoardService,
    private scienceBoardSevice:ScienceBoardService,
    private topcService:TopicService,
    private congressImageService:CongressImageService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.getCongressPresident();
    this.getRegulatoryBoard();
    this.getScienceBoard();
    this.getTopics();
    this.createcongressAddForm();
  }


  add() {
    if (!this.congressAddForm.valid) {
      this.toastrService.error("Formunuz hatalı", "Geçersiz form");
    } else {
      let congressModel = Object.assign({}, this.congressAddForm.value);
        
      this.congressService.add(congressModel).subscribe(congressAddSuccessResponse => {
        if (this.congressImagesFiles.length === 0) {  //Resim yok sadece kongre eklendi
          this.toastrService.success("Yeni kongre başarıyla eklendi", "İşlem başarılı");
          this.closeCongressAddModal();
        }
        else {  
          if (this.congressImagesFiles.length > 5) { //Max 5 Image
            this.toastrService.error("En fazla 5 resim yükleyebilirsiniz", "Kongre eklenmedi");
          } else {
            this.uploadAllImagesToServer(this.congressImagesFiles, congressAddSuccessResponse.data).then((unUploadFileList) => {
              
              let unUploadedFiles: UploadFile[] = unUploadFileList;
              if (unUploadedFiles.length === 0) {
               
                this.toastrService.success("Yeni kongre ve resimleri başarıyla eklendi", "İşlem başarılı");
                this.closeCongressAddModal();
              } else {
                let failFileNameMessage: string = ""
                unUploadedFiles.forEach(file => {
                  failFileNameMessage += file.file.name + ", "
                });
                this.toastrService.warning("Yeni kongre başarıyla eklendi fakat bazı resimler yüklenemedi. Yüklenemeyen dosyalar: " + failFileNameMessage, "İşlem kısmen başarılı");
                this.closeCongressAddModal();
              }
            })

          }
        }
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Kongre eklenemedi");
      })
    }
  }

  private uploadAllImagesToServer(uploadFiles: UploadFile[], congressId: number): Promise<UploadFile[]> {
    return new Promise<UploadFile[]>((methodResolve) => {
      if (uploadFiles.length > 0) {
        let unUploadedFiles: UploadFile[] = []
        const allUploads = new Promise<void>(async (resolveAllUploads) => {
          let counter: number = 0;
          for (const file of uploadFiles) {
            await this.uploadImageToServer(file, congressId).then(fileStatus => {
              if (fileStatus.uploadStatus === false) {
                unUploadedFiles.push(fileStatus);
              }
            }).then(() => {
              counter += 1;
              if (counter === uploadFiles.length) {
                resolveAllUploads();
              }
            })
          }
        })
        allUploads.then(() => {
          methodResolve(unUploadedFiles);
        })
      } else {
        let emptyArray: UploadFile[] = [];
        methodResolve(emptyArray);
      }
    })
  }

  private uploadImageToServer(uploadFile: UploadFile, congrssId: number): Promise<UploadFile> {
    return new Promise<UploadFile>((result) => {
      this.congressImageService.uploadImage(uploadFile.file, congrssId).subscribe((uploadSuccess) => {
        uploadFile.uploadStatus = true;
        result(uploadFile);
      }, (uploadFail) => {
        uploadFile.uploadStatus = false;
        result(uploadFile);
      })
    })
  }

  deleteImageFromCongressImagesList(selectedImage:UploadFile){
    this.congressImagesFiles.splice(this.congressImagesFiles.indexOf(selectedImage),1);
    this.congressImagesPaths.splice(this.congressImagesPaths.indexOf(selectedImage),1);
  }

  addCongressImagesToCongressImagesAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if (this.congressImagesFiles.length < 5) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadStatus = false;
          let preselectedFile = this.congressImagesFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addCongressImageToCongressImagesPaths(image).then((success) => {
              if (success) {
                this.congressImagesFiles.push(uploadFile);
              }
            });
          } else {
            this.toastrService.warning("Bu resmi daha önce listeye eklediniz", "Zaten listede");
          }
        }
      } else {
        this.toastrService.error("En fazla 5 resim ekleyebilirsiniz", "Resim eklenemiyor");
      }

    }
  }


  private addCongressImageToCongressImagesPaths(image: any): Promise<boolean> {
    return new Promise<boolean>((result) => {
      this.checkFileMimeType(image).then((successStatus) => {
        if (successStatus) {
          var reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {
            this.congressImagesPaths.push(reader.result);
            result(true);
          }
        } else {
          this.toastrService.error("Yalnızca resim dosyası yükleyebilirsiniz", "Dosya eklenmedi");
          result(false);
        }
      })
    })
  }

  private checkFileMimeType(file: any): Promise<boolean> {
    return new Promise<boolean>((methodResolve) => {
      var mimeType = file.type;
      methodResolve(mimeType.match(/image\/*/) != null);
    })
  }


  private getTopics(){
    this.topcService.getTopics().subscribe(response=>{
      this.topics=response.data;
    })
  }

  

  private getScienceBoard(){
    this.scienceBoardSevice.getScienceBoards().subscribe(response=>{
      this.scienceBoards=response.data;
    })
  }

  private getRegulatoryBoard(){
    this.regulatoryBoardService.getRegulatoryBoards().subscribe(response=>{
      this.regulatoryBoards=response.data
    })
  }

  private getCongressPresident(){
    this.congressPresidentService.getCongressPresidents().subscribe(response=>{
      this.congressPresidents=response.data;
    })
  }

  private createcongressAddForm(){
    this.congressAddForm=this.formService.createCongressForm();
  }

  closeCongressAddModal(){
    this.congressAddModal.close();
  }
}
