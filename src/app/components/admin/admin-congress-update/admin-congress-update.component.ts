import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Congress } from 'src/app/models/entities/congress';
import { CongressImage } from 'src/app/models/entities/congress-image';
import { CongressPresident } from 'src/app/models/entities/congress-president';
import { RegulatoryBoard } from 'src/app/models/entities/regulatory-board';
import { ScienceBoard } from 'src/app/models/entities/science-board';
import { Topic } from 'src/app/models/entities/topic';
import { UploadFile } from 'src/app/models/uploadFile';
import { CongressImageService } from 'src/app/services/congress-image.service';
import { CongressPresidentService } from 'src/app/services/congress-president.service';
import { CongressService } from 'src/app/services/congress.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { RegulatoryBoardService } from 'src/app/services/regulatory-board.service';
import { ScienceBoardService } from 'src/app/services/science-board.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-admin-congress-update',
  templateUrl: './admin-congress-update.component.html',
  styleUrls: ['./admin-congress-update.component.css']
})
export class AdminCongressUpdateComponent implements OnInit {
  currentCongress:Congress;
  congressUpdateForm:FormGroup;
  congressPresidents:CongressPresident[];
  regulatoryBoards:RegulatoryBoard[];
  scienceBoards:ScienceBoard[];
  topics:Topic[];
  congressImages:CongressImage[]=[];
  
  uploadFiles:UploadFile[]=[];
  uploadImagesPaths:any[]=[]
  
    constructor(
      private congressService:CongressService,
      private congressUpdateModal:MatDialogRef<AdminCongressUpdateComponent>,
      private congressPresidentServie:CongressPresidentService,
      private regulatoryBoardService:RegulatoryBoardService,
      private scienceBoardSevice:ScienceBoardService,
      private topcService:TopicService,
      private congressImageService:CongressImageService,
      private toastrService:ToastrService,
      private errorService:ErrorService,
      private formService:FormService
    ) { }

  ngOnInit(): void {
    this.createCongressUpdateForm();
    this.getCongressPresident();
    this.getRegulatoryBoard();
    this.getScienceBoard();
    this.getTopics();
    this.getCongressImages();
  }

  update() {
    if (!this.congressUpdateForm.valid) {
      this.toastrService.error("Formunuz hatalı", "Geçersiz form")
    } else {
      let congressUpdateModel = Object.assign({}, this.congressUpdateForm.value);
      congressUpdateModel.Id = this.currentCongress.congressId;
      let deletedImages = this.currentCongress.congressImages.filter(image => image.id != -1 && this.congressImages.indexOf(image) == -1)
      let congressInfoChanged: boolean = this.checkIfCongressObjectChanged(congressUpdateModel, this.currentCongress);
      let congressImagesChanged: boolean = this.checkIfCongressImagesChanged(this.uploadFiles, deletedImages)
      if (!congressInfoChanged && !congressImagesChanged) {
        this.toastrService.error("Herhangi bir değişiklik yapmadınız", "Güncellenmedi")
      } else {
        if ((this.congressImages.length + this.uploadFiles.length) > 10) { //Max 5 Image
          this.toastrService.error("En fazla 10 resim yükleyebilirsiniz", "Kongre eklenmedi");
        } else {
          this.updateCongressImages(deletedImages, this.uploadFiles).then((updateCongressImageResult) => {
            this.congressService.update(congressUpdateModel).subscribe(updateSuccess => {
              if (updateCongressImageResult.length > 0) {
                this.toastrService.warning("Kongre başarıyla güncellendi fakat bazı resimler güncellenemedi. " + updateCongressImageResult, "Kongre kısmen güncellendi")
                this.closeCongressUpdateModal();
              } else {
                this.toastrService.success("Kongre başarıyla güncellendi", "Kongre güncellendi")
                this.closeCongressUpdateModal();
              }
            }, errorResponse => {
              this.errorService.showBackendError(errorResponse, "Kongre güncellenemedi");
            })
          });
        }
      }
    }
  }

  private checkIfCongressImagesChanged(uploadList: UploadFile[], deleteList: CongressImage[]) {
    return !(uploadList.length === 0 && deleteList.length === 0)
  }

  private checkIfCongressObjectChanged(newCongressObject:any,oldCongressObject:Congress){
    return !(newCongressObject.congressPresidentId==oldCongressObject.congressPresidentId &&
      newCongressObject.congressName==oldCongressObject.congressName&&
      newCongressObject.congressAbout==oldCongressObject.congressAbout&&
      newCongressObject.congressCity==oldCongressObject.congressCity&&
      newCongressObject.congressPlace==oldCongressObject.congressPlace&&
      newCongressObject.scienceBoardId==oldCongressObject.scienceBoardId&&
      newCongressObject.regulatoryBoardId==oldCongressObject.regulatoryBoardId&&
      newCongressObject.topicId==oldCongressObject.topicId&&
      newCongressObject.congressDate==oldCongressObject.congressDate)
  }

  private updateCongressImages(deletedImages: CongressImage[], uploadFiles: UploadFile[]): Promise<string> {
    return new Promise<string>((methodResolve) => {
      if (this.congressImages.length < this.currentCongress.congressImages.length) { 
        deletedImages = this.currentCongress.congressImages.filter(image => image.id != -1 && this.congressImages.indexOf(image) == -1);
      }
      let unDeletedImagesList: string = "";
      let unUploadedFileList: string = "";
      let deletePromise = new Promise<void>((deletePromiseResolve) => {
        this.deleteAllSelectedImagesFromServer(deletedImages).then((deleteResolve) => {
          if (deleteResolve.length > 0) {
            for (let i = 0; i < deleteResolve.length; i++) {
              unDeletedImagesList += deleteResolve[i].id + ', ';
              if (i === deleteResolve.length - 1) {
                deletePromiseResolve();
              }
            }
          } else {
            deletePromiseResolve();
          }
        })
      })
      deletePromise.then(() => {
        let uploadPromise = new Promise<void>((uploadPromiseResolve) => {
          this.uploadAllImagesToServer(uploadFiles).then((uploadResolve) => {
            if (uploadResolve.length > 0) {
              for (let i = 0; i < uploadResolve.length; i++) {
                unUploadedFileList += uploadResolve[i].file.name + ', ';
                if (i === uploadResolve.length - 1) {
                  uploadPromiseResolve();
                }
              }
            } else {
              uploadPromiseResolve();
            }
          })
        })
        uploadPromise.then(() => {
          let resultString = "";
          if (unDeletedImagesList.length > 0) {
            resultString += "Silinemeyen resim ID'leri: " + unDeletedImagesList
          }
          if (unUploadedFileList.length > 0) {
            resultString += "Yüklenemeyen resimler: " + unUploadedFileList
          }
          methodResolve(resultString);
        })
      })
    })
  }

  private deleteAllSelectedImagesFromServer(deletedImages: CongressImage[]): Promise<CongressImage[]> {
    return new Promise<CongressImage[]>((methodResolve) => {
      if (deletedImages.length > 0) {
        let unDeletedImages: CongressImage[] = [];
        const allDelets = new Promise<void>(async (resolveAllDelets) => {
          let counter = 0;
          for (const image of deletedImages) {
            await this.deleteImageFromServer(image).then((deleteSuccessFile) => {
            }, (deleteFailFile) => {
              unDeletedImages.push(deleteFailFile);
            }).then(() => {
              counter += 1;
              if (counter === deletedImages.length) {
                resolveAllDelets();
              }
            })
          }
        });
        allDelets.then(() => {
          methodResolve(unDeletedImages);
        })
      } else {
        let emptyArray: CongressImage[] = [];
        methodResolve(emptyArray);
      }
    })
  }

  private deleteImageFromServer(deletedImage: CongressImage): Promise<CongressImage> {
    return new Promise<CongressImage>((resolve, reject) => {
      this.congressImageService.deleteImage(deletedImage).subscribe(deleteSuccess => {
        resolve(deletedImage);
      }, deleteFail => {
        reject(deletedImage);
      })
    })
  }

  private uploadAllImagesToServer(uploadFiles: UploadFile[]): Promise<UploadFile[]> {
    return new Promise<UploadFile[]>((methodResolve) => {
      if (uploadFiles.length > 0) {
        let unUploadedFiles: UploadFile[] = []
        const allUploads = new Promise<void>(async (resolveAllUploads) => {
          let counter = 0;
          for (const file of uploadFiles) {
            await this.uploadImageToServer(file).then((fileStatus) => {
              if (fileStatus.uploadStatus === false) {
                unUploadedFiles.push(fileStatus)
              }
            }).then(() => {
              counter += 1;
              if (counter === uploadFiles.length) {
                resolveAllUploads();
              }
            });
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

  private uploadImageToServer(uploadFile: UploadFile): Promise<UploadFile> {
    return new Promise<UploadFile>((result) => {
      this.congressImageService.uploadImage(uploadFile.file, this.currentCongress.congressId).subscribe((uploadSuccess) => {
        uploadFile.uploadStatus = true;
        result(uploadFile);
      }, uploadFail => {
        uploadFile.uploadStatus = false;
        result(uploadFile);
      })
    })
  }

  addCongressImagesToUploadAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if ((this.congressImages.length + this.uploadFiles.length) < 10) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadStatus = false;
          let preselectedFile = this.uploadFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addCongressImageToUploadImagesPath(image).then((success) => {
              if (success) {
                this.uploadFiles.push(uploadFile);
              }
            });
          } else {
            this.toastrService.warning("Bu resmi daha önce listeye eklediniz", "Zaten listede");
          }
        }
      } else {
        this.toastrService.error("En fazla 10 resim ekleyebilirsiniz", "Resim eklenemiyor");
      }
    }
  }

  private addCongressImageToUploadImagesPath(image: any): Promise<boolean> { 
    return new Promise<boolean>((result) => {
      this.checkFileMimeType(image).then((successStatus) => {
        if (successStatus) {
          var reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {
            this.uploadImagesPaths.push(reader.result);
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

  private createCongressUpdateForm() {
    this.congressUpdateForm = this.formService.createCongressForm();
    this.autoFillFieldsInCongressUpdateForm();
  }

  private autoFillFieldsInCongressUpdateForm() {
    let keys = Object.keys(this.congressUpdateForm.controls);
    keys.forEach(key => {
      let keyErrors = this.congressUpdateForm.get(key)?.errors;
      if (keyErrors != null) {
        let errorList = Object.keys(keyErrors);
        if (errorList.indexOf("required") != -1) {
          let congress = Object.entries(this.currentCongress);
          congress.forEach(entries => {
            if (entries[0] == key) {
              this.congressUpdateForm.get(key)?.setValue(entries[1])
            }
          });
        }
      }
    })
  }

  deleteImageFromCongressImages(image: CongressImage) {
    this.congressImages.splice(this.congressImages.indexOf(image), 1);
  }

  deleteImageFromUploadFiles(uploadFile: UploadFile) {
    this.uploadImagesPaths.splice(this.uploadImagesPaths.indexOf(uploadFile), 1);
    this.uploadFiles.splice(this.uploadFiles.indexOf(uploadFile), 1);
  }

  getImagePath(imagePath: string) {
    return this.congressImageService.getImagePath(imagePath);
  }

  private getCongressImages() {
    this.currentCongress.congressImages.forEach(image => {
      if (image.id != -1) { //Do not add the default vehicle image to the list.
        this.congressImages.push(image);
      }
    });
   
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
    this.congressPresidentServie.getCongressPresidents().subscribe(response=>{
      this.congressPresidents=response.data;
    })
  }


  closeCongressUpdateModal() {
    this.congressUpdateModal.close();
  }

}
