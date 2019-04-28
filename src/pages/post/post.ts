import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { File } from "@ionic-native/file";
import { HomePage } from "../home/home";

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-post",
  templateUrl: "post.html"
})
export class PostPage {
  @ViewChild("picturesSlides") picturesSlides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private photoViewer: PhotoViewer,
    private file: File
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PostPage");
  }
  ionViewDidEnter() {
    this.picturesSlides._rtl = true;
  }

  showImage(url) {
    console.log(this.file.applicationDirectory + url);
    this.photoViewer.show(url);
  }
  Home() {
    this.navCtrl.push(HomePage);
  }
  changeSlide(index) {
    this.picturesSlides.slideTo(index - 1);
  }

  isActive(index) {
    if (this.picturesSlides.getActiveIndex() == index - 1) return true;
    return false;
  }
}
