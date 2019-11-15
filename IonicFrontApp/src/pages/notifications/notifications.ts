import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicamentUpdatePage } from '../medicament-update/medicament-update';
import  {Api} from        '../../providers/api/api';
import  {EmailProvider} from        '../../providers/email/email';

import  {Alarme} from        '../../Entity/Alarme';
import { Autostart } from '@ionic-native/autostart';
import { Storage } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';

import {Comprime} from '../../Entity/Comprime';
import {Medicament} from '../../Entity/Medicament';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions} from '@ionic-native/barcode-scanner';

import { TextToSpeech } from '@ionic-native/text-to-speech/';
import  {AnlysePage} from '../anlyse/anlyse';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  time: Date = new Date();
  itsTime=false;
  QRCODeISHidden=false;
  public hh:number;
    public hours:number;
    countDownHH=0;
    compList:any=[];
countDowenStart=true;
timeRefrech=5000;
    countDownMM=0;
    
public text:string="its time to goo ";
  public date: string;
  public mm: number;
  lengthComprime:number=0;
 i=0;
retardComp:boolean=false;
 comprime :any=[];
 alarmes:any=[];
 textTs: string;
  rate: number;
  locale: string;
  TimeNow;
  SpeekTurn:number=0;
  idPatient=0;
  count=1000;
  countComp=0;
     duree=1;
speekFinal=0;
CountComprime:number;
qrData=null;
options :BarcodeScannerOptions;
dataSms=null;
created_code="";scanner_QR=null;
  speekText:string='Bonne soir monsieur, Il faut prendrait votre médicament dans le temps Monsieur. Pour t’avoir une bonne santé .           C’est le temps de votre médicament...     Si tu as pris Appuyer sur le bouton j’ai pris';
  constructor(public navCtrl: NavController,public storage:Storage,public barcodeScanner:BarcodeScanner,
    private autostart: Autostart,public alertCtrl:AlertController,
    private alarme:Alarme,private backgroundMode: BackgroundMode,public nativeAudio:NativeAudio,
    private textToSpeech: TextToSpeech, public navParams: NavParams,public emailProvider:EmailProvider ,public api:Api,public medicament:Medicament
  	
) {
 this.nativeAudio.play('../../assets/Son/alert.wav', () => console.log('uniqueId1 is done playing')) ;
this.speekFinal=0;



   this.autostart.enable();
  this.itsTime=false;

this.backgroundMode.enable();
this.text = '';
    this.rate = 1;
    this.locale = 'fr-FR';
  }

  ionViewDidLoad() {
this.storage.get("userP").then((resulst) => {
  this.speakUp(1,"Bonne soir monsieur "  );

             this.idPatient=resulst.id;
             this.created_code= ""+this.idPatient;
             this.getComprime(this.idPatient);
  this.doRefresh();
           });


}
analyse(){
    this.navCtrl.push(AnlysePage);

}
onChangeDate(){

    let alert = this.alertCtrl.create({
    title: 'Bravo',
    message: 'Bravo vous avez terminé tout vous comprimez aujourd’hui',
    buttons: [
 
      {
        text: 'Ok',
        handler: () => {
          this.getComprimeList(this.idPatient);
this.speekFinal=0;
        }
      }
    ]
  });
  alert.present();

}
public CountDown(alarme:number){
  if(this.countDownMM>0){
 this.countDownMM--;
 this.speekText='Bonne soir , Il faut prendrait votre médicament dans le temps . Pour t’avoir une bonne santé .           C’est le temps de votre médicament...     Si tu as pris Appuyer sur le bouton j’ai pris';
}else{

  if(this.countComp==0){
  this.countDownMM=0;
  if(alarme==0){
  this.itsTime=false;
   if(this.speekFinal==0){
        this.speekText="Bravo vous avez terminé tous vous comprimes aujourd’hui ";
this.api.updateAlarme("putAlarme",this.comprime[this.i].id,this.alarme);

  this.onChangeDate();
this.speekFinal=1;
}
}else{
  if(this.speekFinal==0)
   this.itsTime=true;
 }

//*60
if(  alarme!=0){

if(this.calcule()+this.duree*2*60<=0){
  this.retardComp=true;

   this.duree++;
  this.speekText="Monsieur tu es en retard des "+this.duree*15+" minutes. Il faut prendre votre médicament dans le temps. Un email sera envoyé à ton suiveur pour l'informer ";

this.api.sendGmail('sendEmail').subscribe(
  result=> {result});

}
}else{

  this.speekFinal=1;

}}
}

 setTimeout(() => {
   this.  CountDown(alarme)
    }, this.count);
}
public doRefresh() {
this.getComprimeList(this.idPatient);
if(this.itsTime){
this.speakUp(1, this.speekText);


}
 setTimeout(() => {
   this.  doRefresh()
    }, 20000);
}


buttonStop(){
this.alarme.s=true;
this.api.updateAlarme("putAlarme",this.comprime[this.i].id,this.alarme);

this.NextComprime("j'ai ne peut pas pris");

   this.countDownMM= this.calcule(); 
this.itsTime=false;

}
buttonPris(){
    this.retardComp=false;

  //this.api.sendGmail('sendEmail');

this.alarme.d=true;
this.itsTime=false;
  this.countDownMM=  this.calcule(); 
    var d = new Date();
var mm = d.getMonth() + 1;
var dd = d.getDate();
var yy = d.getFullYear();

d.getMinutes();
d.getHours();
var time:any=d.getHours()+":"+d.getMinutes();
console.log(time);
this.alarme.date=time;
this.api.updateAlarme("putAlarme",this.comprime[this.i].id,this.alarme);


  this.NextComprime("bravo");
    if(this.compList.length != 0)
this.speakUp(1,"le nom de votre médicament est "+this.medicament.name+"votre prochain comprimée sera a"+this.hh+"Heure"+this.mm);

}
buttonRepos(){

this.countDownMM+=15*60;
//this.CountDown();
this.alarme.p=true;
this.itsTime=false;

}
NextComprime(text:string){
this.speakUp(1,text);
this.getComprimeList(this.idPatient);

 if(this.lengthComprime!= null){

 if(this.lengthComprime-1 > this.i){
    this.i++;
         


}else{
   this. itsTime=false;
this.count=0;
this.countComp=1;
}

}
this.alarmes=this.comprime[this.i].alarmes;
 this.date=this.comprime[this.i].heurepris as string;
       this.medicament=this.comprime[this.i].medicament;
  if(this.time.getHours()==0){

 if(this.hh!=0)
    this.hh=this.filtreTime(  this.date,"T");
else
 this.hh=24;
 }else{
 this.hh=this.filtreTime(  this.date,"T");

 }  
 this.mm=this.filtreTime(  this.date,":");

this.countDownMM=this.calcule() ;


}
getComprimeList(idpatient){
  var compList:any=[];
 var d = new Date();
var mm = d.getMonth() + 1;
var dd = d.getDate();
var yy = d.getFullYear();
var myDateString = yy + '-' + mm + '-' + dd; //(US)

         this.api.Login("GetComprimesBydateAll",myDateString, this.idPatient).subscribe(
  result=> {
    if(result.length != 0){
this.compList=result;
   this.medicament=this.compList[this.i].medicament;

}}); 
}
getComprime(idpatient):number{

var d = new Date();
var mm = d.getMonth() + 1;
var dd = d.getDate();
var yy = d.getFullYear();
var myDateString = yy + '-' + mm + '-' + dd; //(US)
         this.api.Login("GetComprimesBydateAll",myDateString, this.idPatient).subscribe(
  result=> {
    if(result.length != 0){
this.compList=result;
   this.medicament=this.compList[this.i].medicament;

}});
this.api.Login("GetComprimesBydateFalse",myDateString,idpatient).subscribe(
  result=> {
    if(result.length != 0){

this.comprime=result;
this.alarmes=result[this.i].alarmes;
this.lengthComprime=result.length;
 this.date=this.comprime[this.i].heurepris as string;
 this.medicament=this.comprime[this.i].medicament;
  	 this.hh=this.filtreTime(	this.date,"T");
if(this.time.getHours()==0){
 if(this.hh!=0)
   	 this.hh=this.filtreTime(	this.date,"T");


	
else
 this.hh=24;
}
 this.mm=this.filtreTime(	this.date,":");
 

  }else{
    this.itsTime=false;
    this.speekFinal=1;
  }
  this.speakUp(1,"le nom de votre médicament est "+this.medicament.name+"votre prochain comprimée sera a"+this.hh+"Heure"+this.mm);

  if(this.medicament==null){
this.speakUp(1,'Bravo vous avez terminé tous vous comprimes aujourd’hui');
    this.speekFinal=1;

}
  this.countDownMM=  this.calcule(); 
  this.CountDown(result.length-1);
});
return this.comprime.length-1;
}
calcule() :number{
 var time = new Date();
this.TimeNow=time;
var TimeNowS=0;
var TimeCompS=0;
var times=0;

TimeNowS= (((time.getHours())*60)+time.getMinutes());
TimeCompS= ((this.hh)*60)+this.mm;


times=(TimeCompS-TimeNowS)*60;
console.log(times);

return times;


}
filtreTime(date :string ,char:string):number{
var dateTime : string ="";
var ok: boolean=false;
var j=0;
var hh=0;

 	for (var i = 0; i <	date.length; ++i) {
  		if(this.date.charAt(i)==char){

ok=true;
  			
  		}	

  		if(ok){

dateTime+=date.charAt(i+1);
j++;
	if(j<=2){
hh= parseInt (dateTime ) as number;

	}

  		}
  	}

return hh;
}

 public  speakUp(single:any,  Text:string){
   this.textTs=Text;
this.textToSpeech.speak({
      text: this.textTs,
      rate: this.rate ,
      locale: this.locale
    }).then(
  (msg) => { console.log(msg); },
  (err) => { console.log(err); }
);


 
  }
ComprimeEnQuestion( hh,mm,t):boolean{
  var timeComp=hh+':'+mm;

var isOk=true;
var num1:number;
var num2:number;
for (var i = 0; i < timeComp.length; i++) {
 if( timeComp[i]!=t[i]){
 
 isOk=false
}
     }
    
 return isOk;
}
  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.alertCtrl.create();
    popover.present({
      ev: myEvent
    });
  }
QrCode(){
  if(this.QRCODeISHidden==false)
  this.QRCODeISHidden=true;
else
    this.QRCODeISHidden=false;

}
}
  