import { Component } from '@angular/core';
import { NavController ,PopoverController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Medicament} from '../../Entity/Medicament';
import  {Api} from        '../../providers/api/api';
import {Comprime} from '../../Entity/Comprime';
import {MedicamentUpdatePage} from '../medicament-update/medicament-update';
import { AlertController } from 'ionic-angular';
import {GereMedicamentPage} from'../../pages/gere-medicament/gere-medicament'

import {IndexPage} from'../../pages/index/index'

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  company = {
   form:null
};
private baseUrl ='http://127.0.0.1:8000';// URL to web api
public items:any[];
public Time:any=[];
public anArray:any=[];
public gender:any;
public patient:any;
selectDate :any=[];
Text:string;
reatnumber:any;
error:any;
public yer:number=0;
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController,public storage:Storage,
    private http: HttpClient,public api:Api,public medicament:Medicament,public alertCtrl:AlertController
 ) {
       this.company.form = "frm1";
this.reatnumber=1;  
  }
    reaa(single:any){
this.reatnumber=single/100;
console.log(this.reatnumber);
    }


   public gotoUpdate(){
        this.navCtrl.push(MedicamentUpdatePage);
    }

          goTo(){
            if(this.medicament.nb==this.anArray.length){
            for (var i = 0; i <= this.anArray.length - 1; i++) {
            //  this.ch=+this.S+JSON.stringify( this.anArray[i].value);
          this.Time[i]=this.anArray[i].value;
  }
  this.medicament.nb=this.anArray.length;
    console.log(  this.medicament.nb);
  this.medicament.Date=this.selectDate;
 this.storage.get("user").then(result=>{
console.log(result);
    this.medicament.suiveur=result.id;
     console.log(this.medicament.suiveur);
    this.medicament.comprime= JSON.stringify( this.Time);
         console.log(this.medicament);

    this.api.addItem("Medicament",this.medicament);
    this.alertPompet('Inseration','Inseration avec succse',GereMedicamentPage);
 });


   }else
   {
    this. alertPompet("Erreur Nombre de comprime","nombre de comprime n'est pas équivalent",GereMedicamentPage);
   }
   }
 Add(){
   this.anArray.push({"value":""});
 
   }
  presentConfirm(y:number) {
  let alert = this.alertCtrl.create({
    title: 'Erreur du Temps inattendu',
    message: 'Vérifier le temps qui vous avez ajouté',
    buttons: [
 
      {
        text: 'Valider',
        handler: () => {
  this.anArray[y].value="";
        }
      }
    ]
  });
  alert.present();
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
 
}
onChangeDate(selectDate){
console.log(selectDate);
var d = new Date();
var mm = d.getMonth() + 1;
var dd = d.getDate();
var yy = d.getFullYear();
var myDateString = yy + '-' + mm + '-' + dd;console.log("datesys"+myDateString);
var myDateDate = new Date(myDateString);
console.log(myDateDate);
var selectDateDate = new Date(selectDate);
console.log(selectDateDate);

 if(selectDateDate<=myDateDate) {
    let alert = this.alertCtrl.create({
    title: 'Erreur du Date inattendu',
    message: 'il faut ajouter une date supérieur à date actuelle',
    buttons: [
 
      {
        text: 'Valider',
        handler: () => {
          this.selectDate="";
        }
      }
    ]
  });
  alert.present();
 }
}
   onChange( i:number){
var time=new Date().getHours()+":"+new Date().getMinutes();
          console.log(time);
/**
     if(this.anArray[i].value <= time )
       this.presentConfirm(i);
*/
if(i>0){
if(this.anArray[i].value<this.anArray[i-1].value){
this.presentConfirm(i);

console.log("erreur");

}}

   }
   ionViewWillEnter() {
this.selectDate = new Date().toLocaleDateString();
console.log(this.selectDate);
this.yer=new Date().getFullYear();
this.storage.get("user").then((resulst) => {
             console.log(resulst.id);

this.api.getItem("GetPatientBySuiveur",resulst.id).subscribe(
  result=> {
    console.log(result[0]);
if(result[0]==null)
    this. alertPompet("Erreur Patient","il faut ajouteé un patient pour Insere un médicament ",IndexPage);
else
  this.items=result[0]._patient;
  }

  );
});
  }

  // go to result page
  doSearch() {
    this.navCtrl.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.navCtrl.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.navCtrl.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
}
