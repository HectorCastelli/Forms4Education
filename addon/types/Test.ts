import { getLocalizedText } from "../ui/localization";
import { Constants } from "./constants";

class Test {
  name: string;
  startDate: Date;
  endDate: Date;
  questionBanks: QuestionBank[];
  students: Student[];
}

namespace Forms4Education {
  export namespace Tests {
    /**
     * Initializes the Spreadsheet tabs required for Tests functionality
     *
     * @export
     */
    export function initializeTestSheet() {
      const currentSpreadsheet = SpreadsheetApp.getActive()!;
      if (
        currentSpreadsheet.getSheetByName(Constants.sheetNames.tests) == null
      ) {
        const newTestSheet = currentSpreadsheet.insertSheet(
          Constants.sheetNames.tests
        );
        Forms4Education.Sheets.setSheetDimensions(newTestSheet, 2, 1);
        newTestSheet.getRange(1, 1, 1, 2).setValues([["Name", "Email"]]);
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
      const testSheet = SpreadsheetApp.getActive().getSheetByName(
        Constants.sheetNames.tests
      );

      const students = Forms4Education.Students.loadStudentsFromSheet();
      const questionBanks = Forms4Education.QuestionBanks.loadQuestionBanksFromSheet();

      testSheet.appendRow([]);
    }
  }
}
