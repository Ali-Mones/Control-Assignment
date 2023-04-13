import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { take, tap } from 'rxjs';
import { BackendCommunicatorService } from '../Services/backend-communicator.service';
import { Adapter, MachineInfo, QueueInfo } from '../Classes/Adapter';
import { Machine } from '../Classes/machine';
import { Part } from '../Classes/part';
import { Queue } from '../Classes/queue';
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
  parts: Part[] = [];
  qID: number = 0;
  mID: number = 0;
  state: State = new NormalState(this);
  input: number = 0;
  running: boolean = false;
  timer!: NodeJS.Timer;
  replayTime: number = 1;
  timeTaken: number = 1;
  @Output()
  remaining: EventEmitter<number> = new EventEmitter();

  
  constructor(
    private backend: BackendCommunicatorService
  ) {}
    
  ngOnInit() {
    this.ctx = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext('2d');
    this.initMouseInput();
  }

  update() {
    if (this.running) {
      this.backend.getCurrentImage().pipe(take(1), tap((circuit) => {
        Adapter.adapt(this.parts, circuit);
        this.timeTaken++;
        this.remaining.emit(circuit.productsNum);
      })).subscribe();

      this.backend.isSimulationFinished().pipe(take(1), tap((finished) => {
        if (finished) {
          this.running = false;
          clearInterval(this.timer);
          console.log(finished);
          setTimeout(this.update.bind(this), 1000);
        }
      })).subscribe();

    }
    
    this.backend.c().pipe(take(1), tap((value) => {
      console.log(value);
    })).subscribe();
    this.ctx.clearRect(0, 0, 1536, 661);
    this.parts.forEach((part) => {
      part.update(this.ctx);
    });
  }
  
  startSimulation() {
    let machines: MachineInfo[] = [];
    let queues: QueueInfo[] = [];
    this.parts.forEach((part) => {
      if (part instanceof Machine)
        machines.push(Adapter.toMachineInfo(part));
      else if (part instanceof Queue)
        queues.push(Adapter.toQueueInfo(part));
    });
    
    if (this.input > 0) {
      this.running = true;
      this.backend.startSimulation(JSON.stringify(machines), JSON.stringify(queues), this.input).pipe(take(1)).subscribe();
      this.timer = setInterval(this.update.bind(this), 1000);
    }
  }

  reset() {
    this.backend.resetSimulator().pipe(take(1)).subscribe();
    this.parts = [];
    this.qID = 0;
    this.mID = 0;
    this.state = new NormalState(this);
    this.input = 0;
    this.running = false;
    clearInterval(this.timer);
    this.replayTime = 1;
    this.timeTaken = 1;
    this.update();
  }

  initReplay() {
    this.timer = setInterval(this.replay.bind(this), 1000);
  }

  private replay() {
    if (this.replayTime >= this.timeTaken) {
      clearInterval(this.timer);
      this.replayTime = 0;
      return;
    }
    this.backend.getPrevImage(this.replayTime).pipe(take(1), tap((circuit) => {
      Adapter.adapt(this.parts, circuit);
      this.update();
      this.replayTime++;
    })).subscribe();
  }
  
  private initMouseInput() {
    this.canvas.nativeElement.addEventListener('mousedown', (e) => { this.state.mouseDown(e); });
    this.canvas.nativeElement.addEventListener('mouseup', (e) => { this.state.mouseUp(e); });
    this.canvas.nativeElement.addEventListener('mousemove', (e) => { this.state.mouseMove(e); });
  }

  
  addQ() {
    let q: Queue = new Queue(520, 520, this.qID++);
    this.parts.push(q);
    this.update();
  }

  addM() {
    let m: Machine = new Machine(520, 520, this.mID++);
    this.parts.push(m);
    this.update();
  }

  removePart() {
    this.state = new RemoveState(this);
  }

  addLink() {
    this.state = new LinkState(this);
  }

  unlink() {
    this.state = new UnlinkState(this);
  }
}
