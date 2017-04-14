import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopComponent } from './top/top.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = ([
  { path: '', component: TopComponent },
  { path: 'quiz', component: QuizComponent}
]);

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}