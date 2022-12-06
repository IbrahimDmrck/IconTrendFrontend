import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UploadFile } from 'src/app/models/uploadFile';
import { AnnouncementImageService } from 'src/app/services/announcement-image.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-admin-announcement-add',
  templateUrl: './admin-announcement-add.component.html',
  styleUrls: ['./admin-announcement-add.component.css']
})
export class AdminAnnouncementAddComponent implements OnInit {
  announceAddForm:FormGroup;
  announceImagesFiles:UploadFile[]=[];
  announceImagesPaths:any[]=[]
  

  constructor(
    private announceService:AnnouncementService,
    private announceAddModal:MatDialogRef<AdminAnnouncementAddComponent>, 
    private announceImageService:AnnouncementImageService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService

  ) { }

  ngOnInit(): void {
    this.createAnnounceAddForm();
  }

  add() {
    if (!this.announceAddForm.valid) {
      this.toastrService.error("Formunuz hatalı", "Geçersiz form");
    } else {
      let announceModel = Object.assign({}, this.announceAddForm.value);
      //Add Announce to Server
      this.announceService.add(announceModel).subscribe(announceAddSuccessResponse => {
        if (this.announceImagesFiles.length === 0) {  
          this.toastrService.success("Yeni Duyru başarıyla eklendi", "İşlem başarılı");
          this.closeAnnounceAddModal();
        }
        else {  
          if (this.announceImagesFiles.length > 5) { //Max 5 Image
            this.toastrService.error("En fazla 5 resim yükleyebilirsiniz", "Duyuru eklenmedi");
          } else {
            this.uploadAllImagesToServer(this.announceImagesFiles, announceAddSuccessResponse.data).then((unUploadFileList) => {
              let unUploadedFiles: UploadFile[] = unUploadFileList;
              if (unUploadedFiles.length === 0) {
                this.toastrService.success("Yeni Duyuru ve resimleri başarıyla eklendi", "İşlem başarılı");
                this.closeAnnounceAddModal();
              } else {
                let failFileNameMessage: string = ""
                unUploadedFiles.forEach(file => {
                  failFileNameMessage += file.file.name + ", "
                });
                this.toastrService.warning("Yeni duyuru başarıyla eklendi fakat bazı resimler yüklenemedi. Yüklenemeyen dosyalar: " + failFileNameMessage, "İşlem kısmen başarılı");
                this.closeAnnounceAddModal();
              }
            })

          }
        }
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Duyuru eklenemedi");
      })
    }
  }

  private uploadAllImagesToServer(uploadFiles: UploadFile[], announceId: number): Promise<UploadFile[]> {
    return new Promise<UploadFile[]>((methodResolve) => {
      if (uploadFiles.length > 0) {
        let unUploadedFiles: UploadFile[] = []
        const allUploads = new Promise<void>(async (resolveAllUploads) => {
          let counter: number = 0;
          for (const file of uploadFiles) {
            await this.uploadImageToServer(file, announceId).then(fileStatus => {
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

  private uploadImageToServer(uploadFile: UploadFile, announceId: number): Promise<UploadFile> {
    return new Promise<UploadFile>((result) => {
      this.announceImageService.uploadImage(uploadFile.file, announceId).subscribe((uploadSuccess) => {
        uploadFile.uploadStatus = true;
        result(uploadFile);
      }, (uploadFail) => {
        uploadFile.uploadStatus = false;
        result(uploadFile);
      })
    })
  }

  deleteImageFromAnnounceImagesList(selectedImage: UploadFile) {
    this.announceImagesFiles.splice(this.announceImagesFiles.indexOf(selectedImage), 1);
    this.announceImagesPaths.splice(this.announceImagesPaths.indexOf(selectedImage), 1);
  }

  addAnnounceImagesToAnnounceImagesAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if (this.announceImagesFiles.length < 5) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadStatus = false;
          let preselectedFile = this.announceImagesFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addAnnounceImageToAnnounceImagesPaths(image).then((success) => {
              if (success) {
                this.announceImagesFiles.push(uploadFile);
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

  private addAnnounceImageToAnnounceImagesPaths(image: any): Promise<boolean> { 
    return new Promise<boolean>((result) => {
      this.checkFileMimeType(image).then((successStatus) => {
        if (successStatus) {
          var reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {
            this.announceImagesPaths.push(reader.result);
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

  private createAnnounceAddForm() {
    this.announceAddForm = this.formService.createAnnounceForm();
  }

  closeAnnounceAddModal() {
    this.announceAddModal.close();
  }

}
