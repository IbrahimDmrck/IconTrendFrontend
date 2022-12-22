import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UploadFile } from 'src/app/models/uploadFile';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { KongreImageService } from 'src/app/services/kongre-image.service';
import { KongreService } from 'src/app/services/kongre.service';

@Component({
  selector: 'app-admin-kongre-add',
  templateUrl: './admin-kongre-add.component.html',
  styleUrls: ['./admin-kongre-add.component.css']
})
export class AdminKongreAddComponent implements OnInit {
  kongreAddForm:FormGroup;
  kongreImagesFiles:UploadFile[]=[];
  kongreImagesPaths:any[]=[]
  constructor(
    private kongreService:KongreService,
    private kongreAddModal:MatDialogRef<AdminKongreAddComponent>,
    private kongreImageService:KongreImageService,
    private toastrService:ToastrService,
    private errorService:ErrorService,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createKongreAddForm();
  }

  add() { 
    if (!this.kongreAddForm.valid) {
      this.toastrService.error(this.errorService.showBackendError.toString(), "Geçersiz form");
    } else {
      let kongreModel = Object.assign({}, this.kongreAddForm.value);
      //Add Kongre to Server
      this.kongreService.add(kongreModel).subscribe(kongreAddSuccessResponse => {
        if (this.kongreImagesFiles.length === 0) {  
          this.toastrService.success("Yeni kongre başarıyla eklendi", "İşlem başarılı");
          this.closeKongreAddModal();
        }
        else {  
          if (this.kongreImagesFiles.length > 5) { //Max 5 Image
            this.toastrService.error("En fazla 5 resim yükleyebilirsiniz", "Duyuru eklenmedi");
          } else {
            this.uploadAllImagesToServer(this.kongreImagesFiles, kongreAddSuccessResponse.data).then((unUploadFileList) => {
              let unUploadedFiles: UploadFile[] = unUploadFileList;
              if (unUploadedFiles.length === 0) {
                this.toastrService.success("Yeni kongre ve resimleri başarıyla eklendi", "İşlem başarılı");
                this.closeKongreAddModal();
              } else {
                let failFileNameMessage: string = ""
                unUploadedFiles.forEach(file => {
                  failFileNameMessage += file.file.name + ", "
                });
                this.toastrService.warning("Yeni kongre başarıyla eklendi fakat bazı resimler yüklenemedi. Yüklenemeyen dosyalar: " + failFileNameMessage, "İşlem kısmen başarılı");
                this.closeKongreAddModal();
              }
            })

          }
        }
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Kongre eklenemedi");
      })
    }
  }

  private uploadAllImagesToServer(uploadFiles: UploadFile[], kongreId: number): Promise<UploadFile[]> {
    return new Promise<UploadFile[]>((methodResolve) => {
      if (uploadFiles.length > 0) {
        let unUploadedFiles: UploadFile[] = []
        const allUploads = new Promise<void>(async (resolveAllUploads) => {
          let counter: number = 0;
          for (const file of uploadFiles) {
            await this.uploadImageToServer(file, kongreId).then(fileStatus => {
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

  private uploadImageToServer(uploadFile: UploadFile, kongreId: number): Promise<UploadFile> {
    return new Promise<UploadFile>((result) => {
      this.kongreImageService.uploadImage(uploadFile.file, kongreId).subscribe((uploadSuccess) => {
        uploadFile.uploadStatus = true;
        result(uploadFile);
      }, (_uploadFail) => {
        uploadFile.uploadStatus = false;
        result(uploadFile);
      })
    })
  }


  deleteImageFromKongreImagesList(selectedImage: UploadFile) {
    this.kongreImagesFiles.splice(this.kongreImagesFiles.indexOf(selectedImage), 1);
    this.kongreImagesPaths.splice(this.kongreImagesPaths.indexOf(selectedImage), 1);
  }

  addkongreImagesToKongreImagesAndPathList(imageList: any) {
    if (imageList.length !== 0) {
      if (this.kongreImagesFiles.length < 5) {
        for (let i = 0; i < imageList.length; i++) {
          let uploadFile = new UploadFile();
          let image = imageList[i];
          uploadFile.file = image;
          uploadFile.uploadStatus = false;
          let preselectedFile = this.kongreImagesFiles.find(uploadFile => uploadFile.file.name === image.name);
          if (preselectedFile === undefined) {
            this.addKongreImageToKongreImagesPaths(image).then((success) => {
              if (success) {
                this.kongreImagesFiles.push(uploadFile);
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

  private addKongreImageToKongreImagesPaths(image: any): Promise<boolean> { 
    return new Promise<boolean>((result) => {
      this.checkFileMimeType(image).then((successStatus) => {
        if (successStatus) {
          var reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {
            this.kongreImagesPaths.push(reader.result);
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

  private createKongreAddForm() {
    this.kongreAddForm = this.formService.createKongreForm();
  }

  closeKongreAddModal() {
    this.kongreAddModal.close();
  }



}
