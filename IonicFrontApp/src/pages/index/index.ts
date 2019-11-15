import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MedicamentUpdatePage} from '../medicament-update/medicament-update';
import {GereMedicamentPage} from '../gere-medicament/gere-medicament';
import  {GerePatientPage} from '../gere-patient/gere-patient';

import {LoginPage} from '../login/login';
import { Storage } from '@ionic/storage';
import {SuiviPage} from '../suivi/suivi';
import {ArchivePage} from '../archive/archive';


/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
  }

   public GereMedicaments(){
   	      this.storage.get("user").then((resulst) => {
   	      	console.log(resulst);
});
        this.navCtrl.push(GereMedicamentPage);
    }
 public Gere(){
        this.navCtrl.push(LoginPage);
    }
    public GoTOpagesuivi(){
    	        this.navCtrl.push(SuiviPage);

    }
      public GoTOPatient(){
              this.navCtrl.push(GerePatientPage);

    }
       public GoTOArchive(){
              this.navCtrl.push(ArchivePage);

    }

}
