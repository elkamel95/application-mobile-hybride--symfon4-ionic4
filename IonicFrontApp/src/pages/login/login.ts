import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {Api} from "../../providers/api/api";
import {login} from "../../Entity/Login"
import {NotificationsPage} from "../notifications/notifications";
import {GereMedicamentPage} from'../../pages/gere-medicament/gere-medicament'
import {IndexPage} from'../../pages/index/index'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public nav: NavController,public api:Api,public user:login,public storage:Storage
  , public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
    this.storage.clear();

      this.storage.remove("user");
            this.storage.remove("userP");

  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    console.log(this.user);
    this.api.Login('GetUser',this.user.tel,this.user.mot).subscribe(result=>
      {
              if(result!=null){

        if(result[0].utilisateur.role == 0){
  
    this.storage.set("userP",result[0]);
          this.nav.setRoot(NotificationsPage);
          console.log(result[0].utilisateur.role);

    }
else{
              

    this.storage.set("user",result[0]);
              this.nav.setRoot(IndexPage);
          console.log(result[0].utilisateur.role);


}}else{

 this.LoginInCorrect();
}



      });


  //this.api.addAny('GetUser',this.user.tel);
  }
    LoginInCorrect() {
    let forgot = this.forgotCtrl.create({
    title: 'Login or Mot Passe incorrect',
      message: "Entre Votre numéro du telephone et mot passe correct  ",
    
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            console.log('Cancel clicked');
          }
        }]});
    forgot.present();

  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
