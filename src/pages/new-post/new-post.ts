import { Component, ViewChild, NgModule } from "@angular/core";
import {
  NavController,
  NavParams,
  IonicPage,
  Slides,
  ActionSheetController,
  LoadingController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ImagePicker } from "@ionic-native/image-picker";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { FilePath } from "@ionic-native/file-path";
import { Base64 } from "@ionic-native/base64";
import { HomePage } from "../home/home";

/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@NgModule()
@Component({
  selector: "page-new-post",
  templateUrl: "new-post.html",
  providers: [FileTransfer, FilePath, HttpClient]
})
export class NewPostPage {
  @ViewChild("mainSlides") slides: Slides;
  @ViewChild("picturesSlides") picturesSlides: Slides;
  fileTransfer: FileTransferObject = this.transfer.create();

  photos: Array<any>;
  eventType: any;
  eventDetails: any;
  postPrivacy: any;
  allowComments: boolean;
  constructor(
    private _httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    public Base64: Base64
  ) {}
  upload() {
    let loader = this.loadingCtrl.create({
      content: "s"
    });
    loader.present();
    console.log("upload triggered");
    let promises = [];
    let imagesConverted = [];
    this.photos.forEach(ele => {
      console.log(`convertgin ${ele}`);
      const convPromise = this.Base64.encodeFile(ele).then(res => {
        imagesConverted.push(res);
        console.log(imagesConverted);
      });
      promises.push(convPromise);
    });
    Promise.all(promises).then(res => {
      console.log("finish converting");
      const objToSend = {
        photos: imagesConverted,
        eventType: 0,
        eventDetails: 0,
        postPrivacy: 0,
        allowComments: true
      };
      this._httpClient
        .post("http://192.168.14.61:61747/api/values", objToSend)
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          },
          () => {
            loader.dismiss();
          }
        );
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad NewPostPage");
  }
  ionViewDidEnter() {
    this.slides._rtl = true;
    this.picturesSlides._rtl = true;
    this.picturesSlides.noSwiping = false;
    this.photos = new Array<any>();
    this.transfer.create();
  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  save() {}
  Home(){
    this.navCtrl.push(HomePage);
  }
  slideChanged() {
    let currentIndex = this.picturesSlides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }
  //THIS IS THE IMAGES SLIDER THINGS

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

  private removePhoto(): void {
    let currentIndex = this.picturesSlides.getActiveIndex();
    this.photos.splice(currentIndex, 1);
    this.picturesSlides.slidePrev(0);
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

  // upload() {
  //   var allGood = true;
  //   let loader = this.loadingCtrl.create({
  //     content: "מעלה תמונות"
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
}
