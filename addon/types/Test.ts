import { getLocalizedText } from "../ui/localization";
import { Constants } from "./constants";

class Test {
  name: string;
  startDate: Date;
  endDate: Date;
  questionBanks: TestQuestionBankConfig[] = [];
  students: Student[] = [];
}

namespace Forms4Education {
  export namespace Tests {
    /**
     * Initializes the Spreadsheet tabs required for Tests functionality
     *
     * @export
     * @param {string} testName The name of the test
     */
    export function initializeTestSheet(test: Test) {
      const currentSpreadsheet = SpreadsheetApp.getActive()!;
      if (
        currentSpreadsheet.getSheetByName(`${Constants.sheetNames.tests}-${test.name}`) == null
      ) {
        const newTestSheet = currentSpreadsheet.insertSheet(
          `${Constants.sheetNames.tests}-${test.name}`)
        );
        Forms4Education.Sheets.setSheetDimensions(newTestSheet, 4, 7 + test.questionBanks.length + test.students.length);
        newTestSheet.getRange(1, 1, 7 + test.questionBanks.length + test.students.length, 4).setValues([
          [getLocalizedText("name"), test.name, null, null],
          [getLocalizedText("startDate"), test.startDate, null, null],
          [getLocalizedText("endDate"), test.endDate, null, null],
          [getLocalizedText("questionBank"), null, null, null],
          [getLocalizedText("name"), getLocalizedText("weight"), getLocalizedText("mandatoryQuestions"), getLocalizedText("optionalQuestions")],
          ...test.questionBanks.map(questionConfig=>[questionConfig.questionBank.name, questionConfig.gradeWeight, questionConfig.mandatoryQuestions, questionConfig.optionalQuestions]),
          [getLocalizedText("student"), null, null, null],
          [getLocalizedText("name"), getLocalizedText("email"), getLocalizedText("studentTestId"), getLocalizedText("sent")],
          ...test.students.map(student=>[student.name, student.email, null, null])
        ]);
      }
    }

    /**
     * Prompts the user for Name and Link of the Tests
     *
     * @export
     */
    export function createTest() {
      const ui = SpreadsheetApp.getUi();

      const html = HtmlService.createTemplateFromFile(
        "html/ui/CreateTest.html"
      );
      html.students = Forms4Education.Students.loadStudentsFromSheet();
      html.questionBanks = Forms4Education.QuestionBanks.loadQuestionBanksFromSheet();

      ui.showModalDialog(
        html.evaluate(),
        `${getLocalizedText("createNew")} - ${getLocalizedText("test")}`
      );
    }
    export function insertTest(formData: {
      testName: string;
      startDate: Date;
      endDate: Date;
      student: string[];
      questionBanks: string[];
    }) {
      const students = Forms4Education.Students.loadStudentsFromSheet();
      const questionBanks = Forms4Education.QuestionBanks.loadQuestionBanksFromSheet();

      const newTest = new Test();
      newTest.name = formData.testName;
      newTest.startDate = new Date(formData.startDate);
      newTest.endDate = new Date(formData.endDate);

      newTest.students = students.filter(student => formData.student.includes(student.email));
      newTest.questionBanks = questionBanks.filter(questionBank => formData.questionBanks.includes(questionBank.name)).map(questionBank => new TestQuestionBankConfig(questionBank));

      initializeTestSheet(newTest);
    }
  }
}
