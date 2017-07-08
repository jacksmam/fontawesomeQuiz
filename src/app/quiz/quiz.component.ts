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

  constructor(private http: Http) {
    this.quizzes = [];
  }

  private getFontAwesome(): Observable<Quiz[]> {
    return this.http.get('/assets/json/fontawesome.json')
                    .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.icons;
  }

  ngOnInit() {
    this.getFontAwesome()
        .subscribe(
          (res: Quiz[]) => {
            for (const quiz of res) {
              this.quizzes.push(new QuizClass(quiz));
            }

            console.log(QuizClass.getRandomQuizzes(this.quizzes, 400));
          }
        );
  }
}
