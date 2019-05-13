import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private active: boolean = false;
  private mode: String = 'message';
  private title: String = '';
  private message: String = '';

  constructor() { }

  close(): void {
    this.active = false;
  }

  showLoader(): void {
    this.active = true;
    this.mode = 'loader';
  }

  showMessage(title: String, message:String): void {
    this.active = true;
    this.mode = 'message';
    this.title = title;
    this.message = message;
  }
}
