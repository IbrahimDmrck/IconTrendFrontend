import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AnnounceImage } from 'src/app/models/entities/announce-image';
import { Announcement } from 'src/app/models/entities/announcement';
import { UploadFile } from 'src/app/models/uploadFile';
import { AnnouncementImageService } from 'src/app/services/announcement-image.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-admin-announcement-update',
  templateUrl: './admin-announcement-update.component.html',
  styleUrls: ['./admin-announcement-update.component.css']
})
export class AdminAnnouncementUpdateComponent implements OnInit {
currentAnnounce:Announcement;
announceImages:AnnounceImage[]=[];
announceUpdateForm:FormGroup;

uploadFiles:UploadFile[]=[];
uploadImagesPaths:any[]=[];
  constructor(
    private announceUpdateModal:MatDialogRef<AdminAnnouncementUpdateComponent>,
    private announceImageService:AnnouncementImageService,
    private toastrService:ToastrService,
    private announceService:AnnouncementService,
    private errorService: ErrorService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.createAnnounceUpdateForm();
    this.getAnnounceImages();
  }

  update() {
    if (!this.announceUpdateForm.valid) {
      this.toastrService.error("Formunuz hatalı", "Geçersiz form")
    } else {
      let announceUpdateModel = Object.assign({}, this.announceUpdateForm.value);
      announceUpdateModel.id = this.currentAnnounce.id;
      let deletedImages = this.currentAnnounce.announceImages.filter(image => image.id != -1 && this.announceImages.indexOf(image) == -1)
      let announceInfoChanged: boolean = this.checkIfAnnounceObjectChanged(announceUpdateModel, this.currentAnnounce);
      let announceImagesChanged: boolean = this.checkIfAnnounceImagesChanged(this.uploadFiles, deletedImages)
      if (!announceInfoChanged && !announceImagesChanged) {
        this.toastrService.error("Herhangi bir değişiklik yapmadınız", "Güncellenmedi")
      } else {
        if ((this.announceImages.length + this.uploadFiles.length) > 5) { //Max 5 Image
          this.toastrService.error("En fazla 5 resim yükleyebilirsiniz", "Duyuru eklenmedi");
        } else {
          this.updateAnnounceImages(deletedImages, this.uploadFiles).then((updateAnnounceImageResult) => {
            this.announceService.update(announceUpdateModel).subscribe(updateSuccess => {
              if (updateAnnounceImageResult.length > 0) {
                this.toastrService.warning("Duyuru başarıyla güncellendi fakat bazı resimler güncellenemedi. " + updateAnnounceImageResult, "Duyuru kısmen güncellendi")
                this.closeAnnounceUpdateModal();
              } else {
                this.toastrService.success("Duyur başarıyla güncellendi", "Duyuru güncellendi")
                this.closeAnnounceUpdateModal();
              }
            }, errorResponse => {
              this.errorService.showBackendError(errorResponse, "Duyuru güncellenemedi");
            })
          });
        }
      }
    }
  }

  private checkIfAnnounceImagesChanged(uploadList: UploadFile[], deleteList: AnnounceImage[]) {
    return !(uploadList.length === 0 && deleteList.length === 0)
  }

  private checkIfAnnounceObjectChanged(newAnnounceObject: any, oldAnnounceObject: Announcement,) {
    return !(newAnnounceObject.announceTitle == oldAnnounceObject.announceTitle &&
      newAnnounceObject.announceContent==oldAnnounceObject.announceContent &&
      newAnnounceObject.announceDate==oldAnnounceObject.announceDate &&
      newAnnounceObject.announceStatus==oldAnnounceObject.announceStatus
     )
  }

  private updateAnnounceImages(deletedImages: AnnounceImage[], uploadFiles: UploadFile[]): Promise<string> {
    return new Promise<string>((methodResolve) => {
      if (this.announceImages.length < this.currentAnnounce.announceImages.length) { 
        deletedImages = this.currentAnnounce.announceImages.filter(image => image.id != -1 && this.announceImages.indexOf(image) == -1);
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

  private deleteAllSelectedImagesFromServer(deletedImages: AnnounceImage[]): Promise<AnnounceImage[]> {
    return new Promise<AnnounceImage[]>((methodResolve) => {
      if (deletedImages.length > 0) {
        let unDeletedImages: AnnounceImage[] = [];
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
        let emptyArray: AnnounceImage[] = [];
        methodResolve(emptyArray);
      }
    })
  }

  private deleteImageFromServer(deletedImage: AnnounceImage): Promise<AnnounceImage> {
    return new Promise<AnnounceImage>((resolve, reject) => {
      this.announceImageService.deleteImage(deletedImage).subscribe(deleteSuccess => {
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
      this.announceImageService.uploadImage(uploadFile.file, this.currentAnnounce.id).subscribe((uploadSuccess) => {
        uploadFile.uploadStatus = true;
        result(uploadFile);
      }, uploadFail => {
        uploadFile.uploadStatus = false;
        result(uploadFile);
      })
    })
  }

  addAnnounceImagesToUploadAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if ((this.announceImages.length + this.uploadFiles.length) < 5) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadStatus = false;
          let preselectedFile = this.uploadFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addAnnounceImageToUploadImagesPath(image).then((success) => {
              if (success) {
                this.uploadFiles.push(uploadFile);
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

  private addAnnounceImageToUploadImagesPath(image: any): Promise<boolean> {
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

  private createAnnounceUpdateForm() {
    this.announceUpdateForm = this.formService.createAnnounceForm();
    this.autoFillFieldsInAnnounceUpdateForm();
  }

  private autoFillFieldsInAnnounceUpdateForm() {
    let keys = Object.keys(this.announceUpdateForm.controls);
    keys.forEach(key => {
      let keyErrors = this.announceUpdateForm.get(key)?.errors;
      if (keyErrors != null) {
        let errorList = Object.keys(keyErrors);
        if (errorList.indexOf("required") != -1) {
          let announce = Object.entries(this.currentAnnounce);
          announce.forEach(entries => {
            if (entries[0] == key) {
              this.announceUpdateForm.get(key)?.setValue(entries[1])
            }
          });
        }
      }
    })
  }

  deleteImageFromAnnounceImages(image: AnnounceImage) {
    this.announceImages.splice(this.announceImages.indexOf(image), 1);
  }

  deleteImageFromUploadFiles(uploadFile: UploadFile) {
    this.uploadImagesPaths.splice(this.uploadImagesPaths.indexOf(uploadFile), 1);
    this.uploadFiles.splice(this.uploadFiles.indexOf(uploadFile), 1);
  }

  getImagePath(imagePath: string) {
    return this.announceImageService.getImagePath(imagePath);
  }

  private getAnnounceImages() {
    this.currentAnnounce.announceImages.forEach(image => {
      if (image.id != -1) { 
        this.announceImages.push(image);
      }
    });
   
  }

  closeAnnounceUpdateModal(){
    this.announceUpdateModal.close()
  }
}
