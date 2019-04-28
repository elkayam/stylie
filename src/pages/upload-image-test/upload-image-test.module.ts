import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadImageTestPage } from './upload-image-test';

@NgModule({
  declarations: [
    UploadImageTestPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadImageTestPage),
  ],
})
export class UploadImageTestPageModule {}
