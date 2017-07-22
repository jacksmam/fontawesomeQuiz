import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {QuizClass} from './models/quiz-class';
import { APP_BASE_HREF } from '@angular/common';
import { Inject } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.styl']
})
export class QuizComponent implements OnInit {

  quizzes: QuizClass[];
  showQuiz: QuizClass;
  answerIndex: number;
  isCorrected: boolean;
  showResult: boolean;
  answerText: string;
  showLastResult: boolean;
  correctedCount: number;

  constructor(@Inject(APP_BASE_HREF) private baseHref: string, private http: Http) {
    this.quizzes = [];
    this.answerIndex = 0;
    this.isCorrected = false;
    this.answerText = '';
    this.showLastResult = false;
    this.correctedCount = 0;
  }

  private getFontAwesome(): Observable<Quiz[]> {
    return this.http.get(this.baseHref + 'assets/json/fontawesome.json')
                    .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.icons;
  }

  clickCheckAnswer() {
    this.showResult = true;
    const quiz = this.quizzes[this.answerIndex];
    this.isCorrected = quiz.isCorrected(this.answerText);
    this.correctedCount += this.isCorrected ? 1 : 0;
    setTimeout( () => {
      if (this.answerIndex >= this.quizzes.length - 1) {
        this.answerIndex = 0;
        this.showLastResult = true;
        return;
      }
      this.answerIndex++;
      this.showResult = false;
      this.isCorrected = false;
      this.answerText = '';
    }, 2000);
  }

  ngOnInit() {
    this.getFontAwesome()
        .subscribe(
          (res: Quiz[]) => {
            for (const quiz of res) {
              this.quizzes.push(new QuizClass(quiz));
            }

            this.quizzes = QuizClass.getRandomQuizzes(this.quizzes, 2);
          }
        );
  }
}
