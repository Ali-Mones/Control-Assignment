import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SignalFlowGraphResultsComponent } from './signal-flow-graph-results/signal-flow-graph-results.component';
import { RouthHurwitzComponent } from './routh-hurwitz/routh-hurwitz.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    TopMenuComponent,
    SignalFlowGraphResultsComponent,
    RouthHurwitzComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
