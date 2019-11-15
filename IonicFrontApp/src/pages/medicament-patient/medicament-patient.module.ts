import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicamentPatientPage } from './medicament-patient';

@NgModule({
  declarations: [
    MedicamentPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicamentPatientPage),
  ],
})
export class MedicamentPatientPageModule {}
