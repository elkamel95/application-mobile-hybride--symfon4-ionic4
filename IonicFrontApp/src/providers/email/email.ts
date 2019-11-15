import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
      import { EmailComposer } from '@ionic-native/email-composer';

/*
  Generated class for the EmailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmailProvider {

  constructor(public http: HttpClient,private emailComposer: EmailComposer) {
  }


sendEmail(){


	this.emailComposer.isAvailable().then((available: boolean) =>{
 if(available) {
 	let email = {
  to: 'fahmielkamel@gmail.com',
  cc: 'fahmielkamel@gmail.com',
  attachments: [
    'file://img/logo.png',
    'res://icon.png',
    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
    'file://README.pdf'
  ],
  subject: 'Cordova Icons',
  body: 'How are you? Nice greetings from Leipzig',
  isHtml: true
};
this.emailComposer.open(email);
 }
});



}}