import { FontawesomeQuizPage } from './app.po';

describe('fontawesome-quiz App', () => {
  let page: FontawesomeQuizPage;

  beforeEach(() => {
    page = new FontawesomeQuizPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
