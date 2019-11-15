import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnlysePage } from './anlyse';

@NgModule({
  declarations: [
    AnlysePage,
  ],
  imports: [
    IonicPageModule.forChild(AnlysePage),
  ],
})
export class AnlysePageModule {}
