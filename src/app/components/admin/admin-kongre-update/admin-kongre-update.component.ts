import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Kongre } from 'src/app/models/entities/kongre';
import { kongreImage } from 'src/app/models/entities/kongre-image';
import { UploadFile } from 'src/app/models/uploadFile';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { KongreImageService } from 'src/app/services/kongre-image.service';
import { KongreService } from 'src/app/services/kongre.service';

@Component({
  selector: 'app-admin-kongre-update',
  templateUrl: './admin-kongre-update.component.html',
  styleUrls: ['./admin-kongre-update.component.css']
})
export class AdminKongreUpdateComponent implements OnInit {
currentCongre:Kongre
kongreImages:kongreImage[]=[];
kongreUpdateForm:FormGroup;

uploadFiles: UploadFile[] = [];
  uploadImagesPaths: any[] = []
  
  constructor(
    private kongreUpdateModal:MatDialogRef<AdminKongreUpdateComponent>,
    private kongreImageService:KongreImageService,
    private toastrService:ToastrService,
    private kongreService:KongreService,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createKongreUpdateForm();
    this.getKongreImages();
  }

  update() {
    if (!this.kongreUpdateForm.valid) {
      this.toastrService.error("Formunuz hatalı", "Geçersiz form")
    } else {
      let kongreUpdateModel = Object.assign({}, this.kongreUpdateForm.value);
      kongreUpdateModel.Id = this.currentCongre.kongreId;
      let deletedImages = this.currentCongre.kongreImages.filter(image => image.id != -1 && this.kongreImages.indexOf(image) == -1)
      let kongreInfoChanged: boolean = this.checkIfKongreObjectChanged(kongreUpdateModel, this.currentCongre);
      let kongreImagesChanged: boolean = this.checkIfKongreImagesChanged(this.uploadFiles, deletedImages)
      if (!kongreInfoChanged && !kongreImagesChanged) {
        this.toastrService.error("Herhangi bir değişiklik yapmadınız", "Güncellenmedi")
      } else {
        if ((this.kongreImages.length + this.uploadFiles.length) > 5) { //Max 5 Image
          this.toastrService.error("En fazla 5 resim yükleyebilirsiniz", "Kongre eklenmedi");
        } else {
          this.updateKongreImages(deletedImages, this.uploadFiles).then((updateKongreImageResult) => {
            this.kongreService.update(kongreUpdateModel).subscribe(_updateSuccess => {
              if (updateKongreImageResult.length > 0) {
                this.toastrService.warning("Kongre başarıyla güncellendi fakat bazı resimler güncellenemedi. " + updateKongreImageResult, "Kongre kısmen güncellendi")
                this.closeKongreUpdateModal();
              } else {
                this.toastrService.success("Kongre başarıyla güncellendi", "Kongre güncellendi")
                this.closeKongreUpdateModal();
              }
            }, errorResponse => {
              this.errorService.showBackendError(errorResponse, "Kongre güncellenemedi");
            })
          });
        }
      }
    }
  }

  private checkIfKongreImagesChanged(uploadList: UploadFile[], deleteList: kongreImage[]) {
    return !(uploadList.length === 0 && deleteList.length === 0)
  }

  private checkIfKongreObjectChanged(newKongreObject: any, oldKongreObject: Kongre,) {
    return !(newKongreObject.kongreBaskani == oldKongreObject.kongreBaskani &&
      newKongreObject.kongreDuzenlemeKurulu == oldKongreObject.kongreDuzenlemeKurulu &&
      newKongreObject.bilimKurulu == oldKongreObject.bilimKurulu &&
      newKongreObject.kongreKonusu == oldKongreObject.kongreKonusu &&
      newKongreObject.kongreAdi == oldKongreObject.kongreAdi &&
      newKongreObject.kongreHakkinda == oldKongreObject.kongreHakkinda &&
      newKongreObject.kongreAdresi == oldKongreObject.kongreAdresi &&
      newKongreObject.kongreTarihi == oldKongreObject.kongreTarihi )
  }

  private updateKongreImages(deletedImages: kongreImage[], uploadFiles: UploadFile[]): Promise<string> {
    return new Promise<string>((methodResolve) => {
      if (this.kongreImages.length < this.currentCongre.kongreImages.length) { //If the kongre image was deleted
        deletedImages = this.currentCongre.kongreImages.filter(image => image.id != -1 && this.kongreImages.indexOf(image) == -1);
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

  private deleteAllSelectedImagesFromServer(deletedImages: kongreImage[]): Promise<kongreImage[]> {
    return new Promise<kongreImage[]>((methodResolve) => {
      if (deletedImages.length > 0) {
        let unDeletedImages: kongreImage[] = [];
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
        let emptyArray: kongreImage[] = [];
        methodResolve(emptyArray);
      }
    })
  }

  private deleteImageFromServer(deletedImage: kongreImage): Promise<kongreImage> {
    return new Promise<kongreImage>((resolve, reject) => {
      this.kongreImageService.deleteImage(deletedImage).subscribe(deleteSuccess => {
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
      this.kongreImageService.uploadImage(uploadFile.file, this.currentCongre.kongreId).subscribe((uploadSuccess) => {
        uploadFile.uploadStatus = true;
        result(uploadFile);
      }, uploadFail => {
        uploadFile.uploadStatus = false;
        result(uploadFile);
      })
    })
  }

  addKongreImagesToUploadAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if ((this.kongreImages.length + this.uploadFiles.length) < 5) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadStatus = false;
          let preselectedFile = this.uploadFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addKongreImageToUploadImagesPath(image).then((success) => {
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

  private addKongreImageToUploadImagesPath(image: any): Promise<boolean> { //Source: https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
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

  private createKongreUpdateForm() {
    this.kongreUpdateForm = this.formService.createKongreForm();
    this.autoFillFieldsInKongreUpdateForm();
  }

  private autoFillFieldsInKongreUpdateForm() {
    let keys = Object.keys(this.kongreUpdateForm.controls);
    keys.forEach(key => {
      let keyErrors = this.kongreUpdateForm.get(key)?.errors;
      if (keyErrors != null) {
        let errorList = Object.keys(keyErrors);
        if (errorList.indexOf("required") != -1) {
          let kongre = Object.entries(this.currentCongre);
          kongre.forEach(entries => {
            if (entries[0] == key) {
              this.kongreUpdateForm.get(key)?.setValue(entries[1])
            }
          });
        }
      }
    })
  }

  deleteImageFromKongreImages(image: kongreImage) {
    this.kongreImages.splice(this.kongreImages.indexOf(image), 1);
  }

  deleteImageFromUploadFiles(uploadFile: UploadFile) {
    this.uploadImagesPaths.splice(this.uploadImagesPaths.indexOf(uploadFile), 1);
    this.uploadFiles.splice(this.uploadFiles.indexOf(uploadFile), 1);
  }

  getImagePath(imagePath: string) {
    return this.kongreImageService.getImagePath(imagePath);
  }

  private getKongreImages() {
    this.currentCongre.kongreImages.forEach(image => {
      if (image.id != -1) { 
        this.kongreImages.push(image);
      }
    });
    
  }

  closeKongreUpdateModal() {
    this.kongreUpdateModal.close();
  }

}
