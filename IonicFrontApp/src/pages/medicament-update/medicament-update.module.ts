import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicamentUpdatePage } from './medicament-update';

@NgModule({
  declarations: [
    MedicamentUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicamentUpdatePage),
  ],
})
export class MedicamentUpdatePageModule {}
