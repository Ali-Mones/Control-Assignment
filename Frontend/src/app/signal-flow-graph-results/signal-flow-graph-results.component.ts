import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-signal-flow-graph-results',
  templateUrl: './signal-flow-graph-results.component.html',
  styleUrls: ['./signal-flow-graph-results.component.css'],
})
export class SignalFlowGraphResultsComponent {

  @Input()
  results: string[][] = [];

  forwardPaths: {path: string, gain: string}[] = [];
  individualLoops: {loop:string, gain: string}[] = [];
  nonTouchingLoops: {loop:string, gain: string}[] = [];
  delta: string[] = [];
  deltas: string[] = [];
  transferFunction: string[] = [];

  @Output()
  closeResultsEvent = new EventEmitter<void>();
}
