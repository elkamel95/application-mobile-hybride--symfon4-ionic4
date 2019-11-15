import { Injectable } from '@angular/core';

/*
  Generated class for the MessageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageServiceProvider {
  messages: string[] = [];
  
   add(message: string) {
     this.messages.push(message);
   }
  
   clear() {
     this.messages = [];
   }
}
