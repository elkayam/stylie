import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UploadImageTestPage } from '../pages/upload-image-test/upload-image-test';
import { NewPostPage } from '../pages/new-post/new-post';
import { PostPage } from '../pages/post/post';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = NewPostPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

