import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MedicamentPatientPage} from '../medicament-patient/medicament-patient';

/**
 * Generated class for the SuiviPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suivi',
  templateUrl: 'suivi.html',
})
export class SuiviPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuiviPage');
  }
GereMedicaments(id){
	this.navCtrl.push(MedicamentPatientPage,{'idpage':id});

}
}
