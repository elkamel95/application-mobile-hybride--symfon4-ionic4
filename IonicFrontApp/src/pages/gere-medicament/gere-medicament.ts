import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MedicamentUpdatePage} from '../medicament-update/medicament-update';
import {HomePage} from '../home/home';

import  {Api} from        '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the GereMedicamentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gere-medicament',
  templateUrl: 'gere-medicament.html',
})
export class GereMedicamentPage {
	public ArrayMedicament :any=[];
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public navParams: NavParams,public api:Api,public storage:Storage) {

  }

public GoToUpdate(id,idMedicament){

	this.navCtrl.push(MedicamentUpdatePage,{'Data':id,'Data2':idMedicament});
}

public  DeleteMedicament(idMedicament){
	console.log(idMedicament);

  this.present(idMedicament );


}

public present(idMedicament){
    let alert = this.alertCtrl.create({
    title: 'Erreur du Date inattendu',
    message: 'il faut ajouter une date supérieur à date actuelle',

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, 
      {
        text: 'Valider',
        handler: () => {
          this.api.deleteItem("medicament",idMedicament).then(res=>{

});
                          this.navCtrl.push(GereMedicamentPage);

this.GetMedicaments();
        }
      }
    ]
  });
  alert.present();

}

  ionViewDidLoad() {

this.GetMedicaments();
  }
public GetMedicaments(){

this.storage.get('user').then(result=>{
	  		this.api.getItem("MedicamentBySuiveur",result.id).subscribe(
  result=> { this.ArrayMedicament=result;
console.log(this.ArrayMedicament);
  });
      });
}
public inserPage(){

    this.navCtrl.push(HomePage);

}

}
