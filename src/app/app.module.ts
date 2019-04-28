import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { UploadImageTestPage } from "../pages/upload-image-test/upload-image-test";
import { HttpClientModule } from "@angular/common/http";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { Base64 } from "@ionic-native/base64";
import { ImagePicker } from "@ionic-native/image-picker";
import { FileTransfer } from "@ionic-native/file-transfer";
import { NewPostPage } from "../pages/new-post/new-post";
import { PostPage } from '../pages/post/post';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [MyApp, HomePage, UploadImageTestPage, NewPostPage,PostPage],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],

  entryComponents: [MyApp, HomePage, UploadImageTestPage, NewPostPage,PostPage],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    Base64,
    PhotoViewer,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
