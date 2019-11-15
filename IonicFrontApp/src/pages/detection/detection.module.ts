import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetectionPage } from './detection';

@NgModule({
  declarations: [
    DetectionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetectionPage),
  ],
})
export class DetectionPageModule {}
