import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { TextToSpeech } from '@ionic-native/text-to-speech/';
import  {Api} from        '../../providers/api/api';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the GerePatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gere-patient',
  templateUrl: 'gere-patient.html',
})
export class GerePatientPage {
qrData=null;
options :BarcodeScannerOptions;
idsuiveur:number=null;
created_code="fahmi";scanner_QR=null;
  constructor(public navCtrl: NavController,public textToSpeech:TextToSpeech,public api:Api,
   public navParams: NavParams,public barcodeScanner:BarcodeScanner,public storage:Storage) {
  }

  ionViewDidLoad() {
this.storage.get("user").then((resulst) => {

             this.idsuiveur=resulst.id;
         
           });  }
scan(idsuiveur:number){
    this.options = {
        prompt : "Scan your barcode "
    }
    this.speakUp("scanner ce qrCode pour enregistrer votre patient  ");

    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        this.scanner_QR = barcodeData.text;
this.api.getItemMedicamentPation('AddPatientTOSuiveur',idsuiveur,this.scanner_QR).subscribe(dat=>{


});
    }, (err) => {
        console.log("Error occured : " + err);
    });            
}
 public  speakUp(Text:string){
this.textToSpeech.speak({
      text: Text,
      rate: 1 ,
      locale: 'fr-FR'
    }).then(
  (msg) => { console.log(msg); },
  (err) => { console.log(err); }
);


 
  }
}
