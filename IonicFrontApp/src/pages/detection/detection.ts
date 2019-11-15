import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {SuiviPage} from "../suivi/suivi";
import { TextToSpeech } from '@ionic-native/text-to-speech/';

/**
 * Generated class for the DetectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detection',
  templateUrl: 'detection.html',
})
export class DetectionPage {
date:string="";
countDown=0;
alarmes:any=[];
medicament:any=[];
ListComp:any=[];
anim:boolean=false;
page:number=0;
retard:boolean=false;
  constructor(public navCtrl: NavController,  private textToSpeech: TextToSpeech, public navParams: NavParams,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetectionPage');
this.countDown=this.navParams.get("Count");
this.date=this.navParams.get("date");
this.alarmes=this.navParams.get("alarme");
this.medicament=this.navParams.get("medicament");
this.ListComp=this.navParams.get("list");
this.page=this.navParams.get("page");
if(this.ListComp.length==0){
	this.alertPompet("","votre patient a prendré leur médicament pour aujourd hui",SuiviPage);
}else{

if(this.countDown<=0){
	this.alertPompet("<h1 style='color: red;'>Retard !!!!</h1>","<h1 style='color: black;'>votre patient a oublié son médicament !!!!!!!</h1>",SuiviPage);
this.speakUp("votre patient a oublié son médicament !!!!!!!");

	this.retard=true
}


	this.doRefresh();

}}
public doRefresh() {
	if(this.anim)
this.anim=false;
else
this.anim=true;
 setTimeout(() => {
   this.  doRefresh()
    }, 1000);
}

 public  speakUp( Text:string){
this.textToSpeech.speak({
      text: Text,
      rate: 1 ,
      locale: 'fr-FR'
    }).then(
  (msg) => { console.log(msg); },
  (err) => { console.log(err); }
);


 
  }
alertPompet(title:string,message:string,page){

     let alert = this.alertCtrl.create({
    title: title,
    message: message,
    buttons: [
 
      {
        text: 'ok',
        handler: () => {
    this.navCtrl.push(page);
        }
      }
    ]
  });
  alert.present();
 
}}
