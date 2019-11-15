import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  {Api} from        '../../providers/api/api';
import {Medicament} from '../../Entity/Medicament';
import {Comprime} from '../../Entity/Comprime';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the MedicamentUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicament-update',
  templateUrl: 'medicament-update.html',
})
export class MedicamentUpdatePage   {
public hh:number;
  date: string;
  mm: number;
  nbComprome=0;
   i=0;
  public ComprimesJours:any=[];
  public anArray:any=[];
    public TimeArray:any=[];
public idPatient:number=0;
public idMedicament:number=0;

public Time :any = [];
  time: Date = new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public api:Api,public medicament :Medicament,public comprime:Comprime ,public toast:ToastController) {
  	this.medicament=new Medicament();
  	this. comprime =new Comprime();
      //  console.log("Medicament:"+this.navParams.data); 
this.idPatient=navParams.get("Data");
this.idMedicament=navParams.get("Data2");

   }
 getMedicament(){
	this.api.getItem("Getarticle",this.idMedicament).subscribe(
  result=> {this.medicament=result;
  });

		

}
 goTo(){
  var Times:any=[];
             for (var i = 0; i <= this.TimeArray.length - 1; i++) {
               var hh:number=this.filtreTime( this.TimeArray[i],"T");
               var mm:number= this.filtreTime(this.TimeArray[i],":")
if((hh<10)&&(mm<10))
 this.Time.push( {"value":"0"+hh+":0"+mm});
else if(hh<10)
 this.Time.push( {"value":"0"+hh+":"+mm});
else if(mm<10)
 this.Time.push( {"value":hh+":0"+mm});
else
   this.Time.push( {"value":hh+":"+mm});

 }

for (var i = 0; i <= this.TimeArray.length - 1; i++) {
            //  this.ch=+this.S+JSON.stringify( this.anArray[i].value);
       Times[i]=this.Time[i].value;

  }

   this.medicament.comprime= JSON.stringify(Times);
   console.log( this.medicament.comprime) ;
    this.api.updateItem("Medicament",this.idMedicament,this.idPatient,this.medicament);
   }
getComprime(){
	 let toast = this.toast.create({
 	
        duration: 3000

    });

this.api.getItemMedicamentPation("GetComprime",this.idMedicament,this.idPatient).subscribe(
  result=> {this.comprime=result ;
    console.log(this.comprime);
  	this.ComprimesJours=result;
this.nbComprome=result.length;
 this.date=this.comprime[this.i].heurepris as string;
 this.hh=this.filtreTime(	this.date,"T");
 this.mm=this.filtreTime(	this.date,":");
     for (var i = 0; i <= this.ComprimesJours.length - 1; i++) {
            //  this.ch=+this.S+JSON.stringify( this.anArray[i].value);
        this.anArray[i]=    this.ComprimesJours[i].heurepris;
  } 
console.log(this.comprime[this.i].heurepris );

  });
          
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
  		console.log(dateTime);
	if(j<=2){
hh= parseInt (dateTime ) as number;

	}

  		}
  	}
  	  		console.log(hh);

return hh;
}
 ionViewDidLoad(){
 	this.getComprime();
  this.	 getMedicament();
this.TimeArray=this.anArray;
}
    




}