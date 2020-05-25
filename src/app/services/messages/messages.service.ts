import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private flash: FlashMessagesService) { }

  showSuccess(message){
    this.flash.show(message, {
      cssClass: 'alert-success',
      timeout: 2000
    });
  }

  showError(message){
    this.flash.show(message, {
      cssClass: 'alert-danger',
      timeout: 2000
    });
  }
}
