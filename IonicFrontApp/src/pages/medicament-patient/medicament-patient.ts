import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Medicament} from '../../Entity/Medicament';
import  {Api} from        '../../providers/api/api';
import {Comprime} from '../../Entity/Comprime';
import {MedicamentUpdatePage} from '../medicament-update/medicament-update';
import { AlertController } from 'ionic-angular';

import {DetectionPage} from "../detection/detection";

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MedicamentPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicament-patient',
  templateUrl: 'medicament-patient.html',
})
export class MedicamentPatientPage {
public items:any=[];
 time: Date = new Date();
  itsTime=false;
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
page:number=0;
  constructor(public navCtrl: NavController,
   public navParams: NavParams, public storage:Storage,public api:Api,public medicament:Medicament) {
  }

  ionViewDidLoad() {
  	this.getPatient();
    this.page=this.navParams.get("idpage");

  }
getPatient(){
  this.storage.get("user").then((resulst) => {
             console.log(resulst.id);

this.api.getItem("GetPatientBySuiveur",resulst.id).subscribe(
  result=> {this.items=result
console.log(this.items);
  }

  );
});

}
getComprime(idpatient):number{

var d = new Date();
var mm = d.getMonth() + 1;
var dd = d.getDate();
var yy = d.getFullYear();
var myDateString = yy + '-' + mm + '-' + dd; //(US)


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

  this.countDownMM=  this.calcule(this.hh,this.mm); 
console.log(    this.countDownMM);
  this.navCtrl.push(DetectionPage,{'Count': this.countDownMM,'date':this.date,'alarme':this.alarmes,'medicament':this.medicament,'list':this.comprime,'page': this.page});

});
return this.comprime.length-1;
}
calcule(hh,mm) :number{
 var time = new Date();
this.TimeNow=time;
var TimeNowS=0;
var TimeCompS=0;
var times=0;

TimeNowS= (((time.getHours())*60)+time.getMinutes());
TimeCompS= ((hh)*60)+mm;


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
public CountDown(){
  if(this.countDownMM>0){
 this.countDownMM--;
}else{
  this.countDownMM=0;
}

 setTimeout(() => {
   this.  CountDown()
    }, this.count);
}

}
