import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UploadFile } from 'src/app/models/uploadFile';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { TransportLayoverImageService } from 'src/app/services/transport-layover-image.service';
import { TransportLayoverService } from 'src/app/services/transport-layover.service';

@Component({
  selector: 'app-admin-transport-layover-add',
  templateUrl: './admin-transport-layover-add.component.html',
  styleUrls: ['./admin-transport-layover-add.component.css']
})
export class AdminTransportLayoverAddComponent implements OnInit {
  transportAddForm:FormGroup;
  transportImagesFiles:UploadFile[]=[];
  transportImagesPaths:any[]=[]
  constructor(
    private transportLayoverService:TransportLayoverService,
    private transportAddModal:MatDialogRef<AdminTransportLayoverAddComponent>,
    private transportImageService:TransportLayoverImageService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createTransportAddForm();
  }

  add() {
    if (!this.transportAddForm.valid) {
      this.toastrService.error("Formunuz hatalı", "Geçersiz form");
    } else {
      let transportModel = Object.assign({}, this.transportAddForm.value);
      //Add Announce to Server
      this.transportLayoverService.add(transportModel).subscribe(announceAddSuccessResponse => {
        if (this.transportImagesFiles.length === 0) {  
          this.toastrService.success("Yeni ulaşım bilgisi başarıyla eklendi", "İşlem başarılı");
          this.closeTransportAddModal();
        }
        else {  
          if (this.transportImagesFiles.length > 5) { //Max 5 Image
            this.toastrService.error("En fazla 5 resim yükleyebilirsiniz", "Ulaşım bilgisi eklenmedi");
          } else {
            this.uploadAllImagesToServer(this.transportImagesFiles, announceAddSuccessResponse.data).then((unUploadFileList) => {
              let unUploadedFiles: UploadFile[] = unUploadFileList;
              if (unUploadedFiles.length === 0) {
                this.toastrService.success("Yeni Ulaşım bilgisi ve resimleri başarıyla eklendi", "İşlem başarılı");
                this.closeTransportAddModal();
              } else {
                let failFileNameMessage: string = ""
                unUploadedFiles.forEach(file => {
                  failFileNameMessage += file.file.name + ", "
                });
                this.toastrService.warning("Yeni Ulaşım bilgisi başarıyla eklendi fakat bazı resimler yüklenemedi. Yüklenemeyen dosyalar: " + failFileNameMessage, "İşlem kısmen başarılı");
                this.closeTransportAddModal();
              }
            })

          }
        }
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Duyuru eklenemedi");
      })
    }
  }

  private uploadAllImagesToServer(uploadFiles: UploadFile[], transportId: number): Promise<UploadFile[]> {
    return new Promise<UploadFile[]>((methodResolve) => {
      if (uploadFiles.length > 0) {
        let unUploadedFiles: UploadFile[] = []
        const allUploads = new Promise<void>(async (resolveAllUploads) => {
          let counter: number = 0;
          for (const file of uploadFiles) {
            await this.uploadImageToServer(file, transportId).then(fileStatus => {
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

  private uploadImageToServer(uploadFile: UploadFile, transportId: number): Promise<UploadFile> {
    return new Promise<UploadFile>((result) => {
      this.transportImageService.uploadImage(uploadFile.file, transportId).subscribe((uploadSuccess) => {
        uploadFile.uploadStatus = true;
        result(uploadFile);
      }, (uploadFail) => {
        uploadFile.uploadStatus = false;
        result(uploadFile);
      })
    })
  }

  deleteImageFromTransportImagesList(selectedImage: UploadFile) {
    this.transportImagesFiles.splice(this.transportImagesFiles.indexOf(selectedImage), 1);
    this.transportImagesPaths.splice(this.transportImagesPaths.indexOf(selectedImage), 1);
  }

  addTransportImagesToTransportImagesAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if (this.transportImagesFiles.length < 5) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadStatus = false;
          let preselectedFile = this.transportImagesFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addTransportImageToTransportImagesPaths(image).then((success) => {
              if (success) {
                this.transportImagesFiles.push(uploadFile);
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

  private addTransportImageToTransportImagesPaths(image: any): Promise<boolean> { 
    return new Promise<boolean>((result) => {
      this.checkFileMimeType(image).then((successStatus) => {
        if (successStatus) {
          var reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {
            this.transportImagesPaths.push(reader.result);
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

  private createTransportAddForm() {
    this.transportAddForm = this.formService.createTransportLayoverForm();
  }

  closeTransportAddModal() {
    this.transportAddModal.close();
  }
  
}
