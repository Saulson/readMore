import { Component, OnInit, HostListener } from '@angular/core';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(
    private service: MessageService) { }

  ngOnInit() {
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.keyCode == 27) {
      this.service.close();
    }
  }

}
