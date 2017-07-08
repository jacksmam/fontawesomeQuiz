export class QuizClass implements Quiz{
  name: string;
  id: string;
  unicode: string;
  created: number;
  categories: string[];
  alias: string[];

  static filterQuizzes(quizzes: QuizClass[], filterTypes: string[]): QuizClass[] {
    if (!quizzes || !filterTypes) { return []; }
    return quizzes.filter((quiz: QuizClass) => {
      return filterTypes.some((type: string) => {
        return quiz.hasCategory(type);
      });
    });
  }

  static getRandomQuizzes(quizzes: QuizClass[], length: number): QuizClass[] {
    if (!quizzes) { throw new Error('quizzes need over one length'); }
    if (quizzes.length < length) { throw new RangeError('need quizzes.length > length'); }
    const selectedQuizIndex = [];
    const selectedQuizzes = [];
    while (selectedQuizzes.length < length) {
      const index = Math.floor(Math.random() * quizzes.length);
      // index数と渡されたクイズデータが同じ場合それ以上データを作れない
      if (selectedQuizIndex.length >= quizzes.length) { break; }
      // すでに追加した問題は弾く
      if (selectedQuizIndex.indexOf(index) >= 0) { continue; }
      selectedQuizzes.push(quizzes[index]);
      selectedQuizIndex.push(index);
    }
    return selectedQuizzes;
  }

  constructor(obj: Quiz) {
    this.name = obj.name;
    this.id = obj.id;
    this.unicode = obj.unicode;
    this.created = obj.created;
    this.categories = obj.categories;
    this.alias = obj.alias;
  }

  isCorrected(answer: string): boolean {
    if (this.id === '' || answer === '') { return false; }
    return this.id === answer;
  }

  hasCategory(type: string): boolean {
    return this.categories.indexOf(type) >= 0;
  }
}
