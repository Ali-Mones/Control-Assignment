import { Component, EventEmitter, Output } from '@angular/core';
import { BackendCommunicatorService } from '../Services/backend-communicator.service';
import { take } from 'rxjs';

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
    this.backend.DoRouths(this.equation).pipe(take(1)).subscribe((poles) => {
      this.RHS_Poles = poles;
    });
  }

}
