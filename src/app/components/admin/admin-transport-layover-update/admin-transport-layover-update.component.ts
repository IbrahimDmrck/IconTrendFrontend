import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransportLayover } from 'src/app/models/entities/transport-layover';
import { TransportLayoverImage } from 'src/app/models/entities/transport-layover-image';
import { UploadFile } from 'src/app/models/uploadFile';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { TransportLayoverImageService } from 'src/app/services/transport-layover-image.service';
import { TransportLayoverService } from 'src/app/services/transport-layover.service';

@Component({
  selector: 'app-admin-transport-layover-update',
  templateUrl: './admin-transport-layover-update.component.html',
  styleUrls: ['./admin-transport-layover-update.component.css']
})
export class AdminTransportLayoverUpdateComponent implements OnInit {
currentTransport:TransportLayover;
transportImages:TransportLayoverImage[]=[];
transportUpdateForm:FormGroup;
uploadFiles: UploadFile[] = [];
uploadImagesPaths: any[] = []
  constructor(
    private transportUpdateModal:MatDialogRef<AdminTransportLayoverUpdateComponent>,
    private transportImagesService:TransportLayoverImageService,
    private transportService:TransportLayoverService,
    private errorService: ErrorService,
    private formService: FormService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createTransportUpdateForm();
    this.getTransportImages();
  }

  update() {
    if (!this.transportUpdateForm.valid) {
      this.toastrService.error("Formunuz hatalı", "Geçersiz form")
    } else {
      let transportUpdateModel = Object.assign({}, this.transportUpdateForm.value);
      transportUpdateModel.Id = this.currentTransport.transportId;
      let deletedImages = this.currentTransport.transportLayoverImages.filter(image => image.id != -1 && this.transportImages.indexOf(image) == -1)
      let transportInfoChanged: boolean = this.checkIfTransportObjectChanged(transportUpdateModel, this.currentTransport);
      let transportImagesChanged: boolean = this.checkIfTransportImagesChanged(this.uploadFiles, deletedImages)
      if (!transportInfoChanged && !transportImagesChanged) {
        this.toastrService.error("Herhangi bir değişiklik yapmadınız", "Güncellenmedi")
      } else {
        if ((this.transportImages.length + this.uploadFiles.length) > 5) { //Max 5 Image
          this.toastrService.error("En fazla 5 resim yükleyebilirsiniz", "Ulaşım bilgisi eklenmedi");
        } else {
          this.updateTransportImages(deletedImages, this.uploadFiles).then((updateTransportImageResult) => {
            this.transportService.update(transportUpdateModel).subscribe(updateSuccess => {
              if (updateTransportImageResult.length > 0) {
                this.toastrService.warning("Ulaşım bilgisi başarıyla güncellendi fakat bazı resimler güncellenemedi. " + updateTransportImageResult, "Ulaşım bilgisi kısmen güncellendi")
                this.closeTransportUpdateModal();
              } else {
                this.toastrService.success("Ulaşım bilgisi başarıyla güncellendi", "Ulaşım bilgisi güncellendi")
                this.closeTransportUpdateModal();
              }
            }, errorResponse => {
              this.errorService.showBackendError(errorResponse, "Ulaşım bilgisi güncellenemedi");
            })
          });
        }
      }
    }
  }

  private checkIfTransportImagesChanged(uploadList: UploadFile[], deleteList: TransportLayoverImage[]) {
    return !(uploadList.length === 0 && deleteList.length === 0)
  }

  private checkIfTransportObjectChanged(newTransportObject: any, oldTransportObject: TransportLayover,) {
    return !(newTransportObject.capacity == oldTransportObject.capacity &&
      newTransportObject.minDemand==oldTransportObject.minDemand&&
      newTransportObject.price==oldTransportObject.price&&
      newTransportObject.description==oldTransportObject.description
      )
  }

  private updateTransportImages(deletedImages: TransportLayoverImage[], uploadFiles: UploadFile[]): Promise<string> {
    return new Promise<string>((methodResolve) => {
      if (this.transportImages.length < this.currentTransport.transportLayoverImages.length) { //If the car image was deleted
        deletedImages = this.currentTransport.transportLayoverImages.filter(image => image.id != -1 && this.transportImages.indexOf(image) == -1);
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

  private deleteAllSelectedImagesFromServer(deletedImages: TransportLayoverImage[]): Promise<TransportLayoverImage[]> {
    return new Promise<TransportLayoverImage[]>((methodResolve) => {
      if (deletedImages.length > 0) {
        let unDeletedImages: TransportLayoverImage[] = [];
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
        let emptyArray: TransportLayoverImage[] = [];
        methodResolve(emptyArray);
      }
    })
  }

  private deleteImageFromServer(deletedImage: TransportLayoverImage): Promise<TransportLayoverImage> {
    return new Promise<TransportLayoverImage>((resolve, reject) => {
      this.transportImagesService.deleteImage(deletedImage).subscribe(deleteSuccess => {
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
      this.transportImagesService.uploadImage(uploadFile.file, this.currentTransport.transportId).subscribe((uploadSuccess) => {
        uploadFile.uploadStatus = true;
        result(uploadFile);
      }, uploadFail => {
        uploadFile.uploadStatus = false;
        result(uploadFile);
      })
    })
  }

  addTransportImagesToUploadAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if ((this.transportImages.length + this.uploadFiles.length) < 5) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadStatus = false;
          let preselectedFile = this.uploadFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addTransportImageToUploadImagesPath(image).then((success) => {
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

  private addTransportImageToUploadImagesPath(image: any): Promise<boolean> {
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

  private createTransportUpdateForm() {
    this.transportUpdateForm = this.formService.createTransportLayoverForm();
    this.autoFillFieldsInTransportUpdateForm();
  }

  private autoFillFieldsInTransportUpdateForm() {
    let keys = Object.keys(this.transportUpdateForm.controls);
    keys.forEach(key => {
      let keyErrors = this.transportUpdateForm.get(key)?.errors;
      if (keyErrors != null) {
        let errorList = Object.keys(keyErrors);
        if (errorList.indexOf("required") != -1) {
          let car = Object.entries(this.currentTransport);
          car.forEach(entries => {
            if (entries[0] == key) {
              this.transportUpdateForm.get(key)?.setValue(entries[1])
            }
          });
        }
      }
    })
  }

  deleteImageFromTransportImages(image: TransportLayoverImage) {
    this.transportImages.splice(this.transportImages.indexOf(image), 1);
  }

  deleteImageFromUploadFiles(uploadFile: UploadFile) {
    this.uploadImagesPaths.splice(this.uploadImagesPaths.indexOf(uploadFile), 1);
    this.uploadFiles.splice(this.uploadFiles.indexOf(uploadFile), 1);
  }

  getImagePath(imagePath: string) {
    return this.transportImagesService.getImagePath(imagePath);
  }

  private getTransportImages() {
    this.currentTransport.transportLayoverImages.forEach(image => {
      if (image.id != -1) { 
        this.transportImages.push(image);
      }
    });
   
  }

  closeTransportUpdateModal(){
    this.transportUpdateModal.close();
  }

}
