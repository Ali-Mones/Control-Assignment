import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendCommunicatorService } from '../Services/backend-communicator.service';
import { Node } from '../Classes/Node';
import { LinkState } from '../States/LinkState';
import { NormalState } from '../States/NormalState';
import { State } from '../States/State';
import { UnlinkState } from '../States/UnlinkState';
import { RemoveState } from '../States/RemoveState';

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

    let id = 0;
    this.nodes.every((node, index) => {
      if (node.id == index) {
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
    let graph: number[][] = [];
    let weights: number[][] = [];
    this.nodes.forEach((obj, index) => {
      graph.push([]);
      weights.push([]);

      obj.next.forEach((next) => {
        graph[index].push(next.node.id);
        weights[index].push(next.gain);
      });

    });

    console.log("graph", graph);
    console.log("weights", weights);
  }
}
