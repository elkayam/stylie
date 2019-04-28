import { Component, NgModule, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  ActionSheetController
} from "ionic-angular";
import { Observable } from "rxjs";
import { LoadingController, Loading, ToastController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File, FileEntry } from "@ionic-native/file";
import { catchError } from "rxjs/operators/catchError";
import { finalize } from "rxjs/operators/finalize";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { FilePath } from "@ionic-native/file-path";
import { Base64 } from "@ionic-native/base64";
import { ImagePicker } from "@ionic-native/image-picker";

/**
 * Generated class for the UploadImageTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-upload-image-test",
  templateUrl: "upload-image-test.html",
  providers: [FileTransfer, FilePath]
})
export class UploadImageTestPage {
  fileTransfer: FileTransferObject = this.transfer.create();
  @ViewChild(Slides) slides: Slides;

  constructor(
    private imagePicker: ImagePicker,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer, // private file: File
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    public base64: Base64
  ) {}

  photos: Array<any>;
 
  // upload() {
  //   // console.log("triggered");
  //   let options: FileUploadOptions = {
  //     fileKey: "file",
  //     fileName: "name.jpg",
  //     headers: {}
  //   };
  //   if(this.photos[0].startsWith('content') || this.photos[0].startsWith('/storage/')) {
  //     if(this.photos[0].startsWith('/storage/')) {
  //         this.photos[0] = 'file://'+this.photos[0];
  //     }
  //     this.filePath.resolveNativePath(this.photos[0]).then(filePath => {
  //         this.photos[0] = filePath;

  //     }).catch(err => { console.log("error occurred"); });
  // }
  //   this.fileTransfer
  //     .upload(this.photos[], "http://192.168.42.111/2525/upload", options)
  //     .then(data => {
  //       console.log("sux");
  //       // success
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  // upload() {
  //   var allGood = true;
  //   let loader = this.loadingCtrl.create({
  //     content: "Uploading..."
  //   });
  //   loader.present();
  //   const fileTransfer: FileTransferObject = this.transfer.create();

  //   for (var i = 0; i < this.photos.length; i++) {
  //     let filename = this.photos[i].split("/").pop();

  //     let options: FileUploadOptions = {
  //       fileKey: "file",
  //       fileName: filename,
  //       chunkedMode: false,
  //       mimeType: "image/jpg",
  //       params: { title: "test" }
  //     };
  //     let promises = [];
  //     let imagesToSend=[];
  //     fileTransfer
  //       .upload(this.photos[i], "http://192.168.42.111/2525/upload", options)
  //       .then(
  //         res => {},
  //         err => {
  //           allGood = false;
  //         }
  //       );
  //   }
  //   if (allGood) {
  //     loader.dismiss();
  //   }
  // }
  upload(){

  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad UploadImageTestPage");
  }
  ionViewDidEnter() {
    this.slides._rtl = true;
    this.slides.pager = true;
    this.photos = new Array<any>();
    this.transfer.create();
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "בחירת תמונה",
      buttons: [
        {
          text: "תמונה מהגלריה",
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: "מצלמה",
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: "ביטול",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  private removePhoto(photo, index): void {
    this.photos.splice(index, 1);
    this.slides.slidePrev(0);
  }
  private openGallery(): void {
    let options = {
      maximumImagesCount: 8,
      quality: 100
    };

    this.imagePicker.getPictures(options).then(
      results => {
        for (var i = 0; i < results.length; i++) {
          this.photos.push(results[i]);
        }
      },
      err => {}
    );
  }
  private takePicture(): void {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      results => {
        this.photos.push(results);
      },
      err => {}
    );
  }

  // public uploadImage() {
  //   // Destination URL
  //   var url = "http://yoururl/upload.php";

  //   // File for Upload
  //   var targetPath = this.pathForImage(this.lastImage);

  //   // File name only
  //   var filename = this.lastImage;

  //   var options = {
  //     fileKey: "file",
  //     fileName: filename,
  //     chunkedMode: false,
  //     mimeType: "multipart/form-data",
  //     params : {'fileName': filename}
  //   };

  //   const fileTransfer: TransferObject = this.transfer.create();

  //   this.loading = this.loadingCtrl.create({
  //     content: 'Uploading...',
  //   });
  //   this.loading.present();

  //   // Use the FileTransfer to upload the image
  //   fileTransfer.upload(targetPath, url, options).then(data => {
  //     this.loading.dismissAll()
  //     this.presentToast('Image succesful uploaded.');
  //   }, err => {
  //     this.loading.dismissAll()
  //     this.presentToast('Error while uploading file.');
  //   });
  // }
}
