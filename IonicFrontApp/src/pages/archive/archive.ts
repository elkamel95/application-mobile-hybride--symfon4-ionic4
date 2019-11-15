import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  {Api} from        '../../providers/api/api';
import {Medicament} from '../../Entity/Medicament';

/**
 * Generated class for the ArchivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {
day:string=null;
month:number=null;
year:number=null;
date:string=null;
compList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:Api,public medicament:Medicament ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArchivePage');
  }
onDaySelect(event){
	this.year=event.year;
	this.month=event.month+1;
	this.day=event.date;

this.date=this.year+'-'+this.month+'-'+this.day;
console.log(this.date);
this.getComprime(this.date,12);
}
getComprime(date,idPatient){
	       this.api.Login("GetComprimesBydateAll",date,idPatient).subscribe(
  result=> {
    if(result.length != 0){
this.compList=result;

}else
this.compList=[];

});
}
}
