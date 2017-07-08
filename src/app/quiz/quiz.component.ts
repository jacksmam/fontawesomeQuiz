import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {QuizClass} from './models/quiz-class';
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

  constructor(private http: Http) {
    this.quizzes = [];
    this.answerIndex = 0;
    this.isCorrected = false;
    this.answerText = '';
  }

  private getFontAwesome(): Observable<Quiz[]> {
    return this.http.get('/assets/json/fontawesome.json')
                    .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.icons;
  }

  clickCheckAnswer() {
    console.log('click');
    this.showResult = true;
    const quiz = this.quizzes[this.answerIndex];
    this.isCorrected = quiz.isCorrected(this.answerText);
    setTimeout( () => {
      this.showResult = false;
      this.isCorrected = false;
      this.answerIndex++;
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

            this.quizzes = QuizClass.getRandomQuizzes(this.quizzes, 10);
          }
        );
  }
}
