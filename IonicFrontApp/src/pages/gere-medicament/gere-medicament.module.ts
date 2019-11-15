import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GereMedicamentPage } from './gere-medicament';

@NgModule({
  declarations: [
    GereMedicamentPage,
  ],
  imports: [
    IonicPageModule.forChild(GereMedicamentPage),
  ],
})
export class GereMedicamentPageModule {}
