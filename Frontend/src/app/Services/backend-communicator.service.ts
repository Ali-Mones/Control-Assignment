import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicatorService {

  constructor(
    private http: HttpClient
  ) {}

  // @GetMapping("/rouths")
  DoRouths(equation: string) {
    return this.http.post<number>("http://localhost:8080/rouths", null, { params: new HttpParams().set('Equation', equation)});
  }

  DoMason(graph: string) {
    return this.http.post<string[][]>("http://localhost:8080/signalflow", null, {params: new HttpParams().set('graph', graph)});
  }
}
