import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import  {Utilisateur} from "../../Entity/Utilisateur";
import  {Suiveur} from "../../Entity/suiveur";
import  {Api} from        '../../providers/api/api';
import  {Patient} from "../../Entity/patient";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
public role:string ="Suiver";
array :any=[];
IsGood:boolean=false;
  constructor(public nav: NavController,
    public api:Api,
    public utilisateur:Utilisateur,
    public suiveur:Suiveur,public patient:Patient,public alertCtrl:AlertController,public navCtrl: NavController) {

  }

  register() {
    console.log(this.utilisateur.role );
    if(this.utilisateur.role == 0){
    this.utilisateur.age=this.patient.age;
    this.utilisateur.etat=this.patient.etat;

console.log(this.utilisateur);
this.api.addAny("Patient",this.utilisateur);

}
else{
  this.api.addAny("suiveur",this.utilisateur).then(res=>{

this.IsGood=true;
});
  this.alertPompet("qsqs","po");

}

  // this.nav.setRoot(HomePage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
  change(){


  }

  alertPompet(title:string,message:string){

     let alert = this.alertCtrl.create({
    title: title,
    message: message,
    buttons: [
 
      {
        text: 'ok',
        handler: () => {
   // this.navCtrl.push(GereMedicamentPage);
        }
      }
    ]
  });
  alert.present();
 
}
}
