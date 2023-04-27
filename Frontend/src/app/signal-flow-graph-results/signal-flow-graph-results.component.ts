import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signal-flow-graph-results',
  templateUrl: './signal-flow-graph-results.component.html',
  styleUrls: ['./signal-flow-graph-results.component.css'],
})
export class SignalFlowGraphResultsComponent {

  forwardPaths: string[] = ["help", "me", "pls"];
  individualLoops: string[] = ["wow", "much", "loops"];
  nonTouchingLoops: string[] = ["loop1", "loop2"];
  delta: number = 0;
  deltas: number[] = [1, 2, 3, 4, 5];
  transferFunction: number = 100;

  @Output()
  closeWindowEvent = new EventEmitter<void>();
}
