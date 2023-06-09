import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { BackendCommunicatorService } from '../Services/backend-communicator.service';
import { Node } from '../Classes/Node';
import { LinkState } from '../States/LinkState';
import { NormalState } from '../States/NormalState';
import { State } from '../States/State';
import { UnlinkState } from '../States/UnlinkState';
import { RemoveState } from '../States/RemoveState';
import { take } from 'rxjs';
import { SignalFlowGraphResultsComponent } from '../signal-flow-graph-results/signal-flow-graph-results.component';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  nodes: Node[] = [];
  state: State = new NormalState(this);
  results: boolean = false;
  routh: boolean = false;

  @Input()
  resultsEvent = new EventEmitter<string[][]>();

  @ViewChild('signal', { static: false })
  signal!: SignalFlowGraphResultsComponent;
  
  constructor(
    private backend: BackendCommunicatorService
  ) {}
    
  ngOnInit() {
    this.ctx = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.addEventListener('mousedown', (e) => { this.state.mouseDown(e); });
    this.canvas.nativeElement.addEventListener('mouseup', (e) => { this.state.mouseUp(e); });
    this.canvas.nativeElement.addEventListener('mousemove', (e) => { this.state.mouseMove(e); });
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  update() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.nodes.forEach((part) => {
      part.update(this.ctx);
    });

    if (!this.routh) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 255)';
      this.ctx.font = "50px serif";
      this.ctx.fillText("Signal Flow Graph", window.innerWidth / 2 - 25, 50);
    }
  }

  addNode() {
    if(this.routh)
      return;

    let id = 1;
    this.nodes.every((node, index) => {
      if (node.id == index + 1) {
        id++;
        return true;
      }
      else
        return false;
    });

    if (this.nodes.length < 12) {
      let node: Node = new Node(520, 520, id);
      this.nodes.push(node);
      this.nodes.sort((a, b) => {
        return a.id - b.id;
      });
      this.update();
    }
    else {
      this.ctx.fillStyle = 'rgba(200, 0, 0, 255)'
      this.ctx.fillText("Too many nodes: can't have more than 12 nodes", window.innerWidth / 2 - 25, 100);
    }
  }

  removePart() {
    if(this.routh)
      return;

    this.state = new RemoveState(this);
  }

  addLink(arc: boolean) {
    if(this.routh)
      return;

    this.state = new LinkState(this, arc);
  }

  unlink() {
    if(this.routh)
      return;

    this.state = new UnlinkState(this);
  }

  showResults() {
    if(this.routh)
      return;

    this.sendGraph();
    this.results = true;
  }

  routhState() {
    this.results = false;
    this.routh = true;
    this.update();
  }

  sendGraph() {
    let graph: {F: number, S: number}[][] = [];
    this.nodes.forEach((obj, index) => {
      graph.push([]);

      obj.next.forEach((next) => {
        graph[index].push({F: next.node.id, S: next.gain});
      });
    });

    if (graph.length == 0)
      return;

    this.backend.DoMason(JSON.stringify(graph)).pipe(take(1)).subscribe((result) => {
      this.resultsEvent.emit(result);
      console.log(result);
      for (let fwdPath of result[0]) {
        let split = fwdPath.split('-G');
        let split2 = split[1].split('-D');
        this.signal.forwardPaths.push({path: split[0], gain: 'G' + split2[0]});
        this.signal.deltas.push('D' + split2[1]);
      }
      for (let indivLoop of result[1]) {
        let split = indivLoop.split('-G');
        this.signal.individualLoops.push({loop: split[0], gain: 'G' + split[1]});
      }
      this.signal.transferFunction.push(result[2][0]);
    });
  }
}
