import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private active: boolean = false;
  private actionAfterClose: boolean = false;
  private mode: String = 'message';
  private title: String = '';
  private message: String = '';

  private activeSubject = new Subject<boolean>();

  constructor() { }

  close(forceClose: boolean = false): void {
    if(forceClose || this.mode == 'message' && this.active){
      this.active = false;  

      if(this.actionAfterClose){
        this.activeSubject.next(true);
        this.actionAfterClose = false;
      }
    }
  }

  showLoader(): void {
    this.active = true;
    this.mode = 'loader';
  }

  showMessage(title: String, message:String, actionAfterClose: boolean = false) {
    this.active = true;
    this.mode = 'message';
    this.title = title;
    this.message = message;

    if(actionAfterClose) {
      this.actionAfterClose = actionAfterClose;
      return this.activeSubject.asObservable();
    }
  }
}
