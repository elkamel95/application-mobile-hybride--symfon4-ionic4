import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerePatientPage } from './gere-patient';

@NgModule({
  declarations: [
    GerePatientPage,
  ],
  imports: [
    IonicPageModule.forChild(GerePatientPage),
  ],
})
export class GerePatientPageModule {}
