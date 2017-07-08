import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';

import { AppRoutingModule } from './app-routing.module';
import { TopComponent } from './top/top.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
