import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent {
  
  @Output()
  addNodeEvent: EventEmitter<void> = new EventEmitter();

  @Output()
  removeEvent: EventEmitter<void> = new EventEmitter();
  
  @Output()
  addLinkEvent: EventEmitter<boolean> = new EventEmitter();
  
  @Output()
  unlinkEvent: EventEmitter<void> = new EventEmitter();

  @Output()
  showResultsEvent: EventEmitter<void> = new EventEmitter();

  @Output()
  routhEvent: EventEmitter<void> = new EventEmitter();
}
