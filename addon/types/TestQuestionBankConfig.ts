class TestQuestionBankConfig {
  questionBank: QuestionBank;
  gradeWeight: number = 1;
  mandatoryQuestions: number = 1;
  optionalQuestions: number = 0;

  constructor(questionBank: QuestionBank) {
    this.questionBank = questionBank;
  }
}
