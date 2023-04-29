import { Component, EventEmitter, Output } from '@angular/core';
import { BackendCommunicatorService } from '../Services/backend-communicator.service';

@Component({
  selector: 'app-routh-hurwitz',
  templateUrl: './routh-hurwitz.component.html',
  styleUrls: ['./routh-hurwitz.component.css'],
})
export class RouthHurwitzComponent {

  constructor(
    private backend: BackendCommunicatorService
  ) {}

  equation: string = "";
  RHS_Poles: number | null = null;

  @Output()
  closeRouthEvent = new EventEmitter<void>();

  getResults() {
    
  }

}
