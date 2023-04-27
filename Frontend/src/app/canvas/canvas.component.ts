import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  id: number = 0;
  state: State = new NormalState(this);
  
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
  }

  addNode() {
    let node: Node = new Node(520, 520, this.id++);
    this.nodes.push(node);
    this.update();
  }

  removePart() {
    this.state = new RemoveState(this);
  }

  addLink(arc: boolean) {
    this.state = new LinkState(this, arc);
  }

  unlink() {
    this.state = new UnlinkState(this);
  }
}
