import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent {
  
  @Output()
  addQEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  addMEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  removeEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  addLinkEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  unlinkEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  startSimulationEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  resetSimulationEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  replayEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  inputChange: EventEmitter<number> = new EventEmitter();

  @Input()
  remainingProducts!: number;

  setInput(event: Event) {
    this.inputChange.emit(parseInt((<HTMLInputElement>event.target).value));
  }
}
