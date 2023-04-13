import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CircuitInfo } from '../Classes/Adapter';

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicatorService {

  constructor(
    private http: HttpClient
  ) {}

  startSimulation(jsonMachines: string, jsonQueues: string, numberOfProducts: number) {
    return this.http.post('http://localhost:8085/startSimulation', null, { params: new HttpParams()
    .set('jsonMachines', jsonMachines)
    .set('jsonQueues', jsonQueues)
    .set('numberOfProducts', numberOfProducts)
    });
  }

  public resetSimulator(){
    return this.http.post('http://localhost:8085/resetSimulator', null);
  }

  public getCurrentImage() {
    return this.http.get<CircuitInfo>('http://localhost:8085/getCurrentImage');
  }

  public isSimulationFinished() {
    return this.http.get('http://localhost:8085/isSimulationFinished');
  }

  public getRemainingProducts() {
    return this.http.get('http://localhost:8085/remainingProducts');
  }

  public getPrevImage(second: number) {
    return this.http.get<CircuitInfo>('http://localhost:8085/replay', { params: new HttpParams()
    .set('second', second)
    });
  }

  public c() {
    return this.http.get('https://localhost:7169/WeatherForecast/print');
  }
}
