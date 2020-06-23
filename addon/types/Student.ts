import { getLocalizedText } from "../ui/localization";
import { Constants } from "./constants";

class Student {
  name: string = "";
  email: string = "";

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

namespace Forms4Education {
  export namespace Students {
    /**
     * Initializes the Spreadsheet tabs required for Students functionality
     *
     * @export
     */
    export function initializeStudentSheet() {
      const currentSpreadsheet = SpreadsheetApp.getActive()!;
      if (
        currentSpreadsheet.getSheetByName(Constants.sheetNames.students) == null
      ) {
        const newStudentSheet = currentSpreadsheet.insertSheet(
          Constants.sheetNames.questionBank
        );
        Forms4Education.Sheets.setSheetDimensions(newStudentSheet, 2, 1);
        newStudentSheet.getRange(1, 1, 1, 2).setValues([["Name", "Email"]]);
      }
    }

    /**
     * Loads all Students definitions from the Spreadsheet
     *
     * @export
     * @returns {Student[]}
     */
    export function loadStudentsFromSheet(): Student[] {
      return SpreadsheetApp.getActive()
        .getSheetByName(Constants.sheetNames.students)
        .getDataRange()
        .getValues()
        .slice(1)
        .map((row) => new Student(row[0], row[1]));
    }

    /**
     * Prompts the user for Name and Link of the Students
     *
     * @export
     */
    export function createStudent() {
      const ui = SpreadsheetApp.getUi();
      const namePrompt = ui.prompt(
        getLocalizedText("insertName"),
        ui.ButtonSet.OK_CANCEL
      );
      const emailPrompt = ui.prompt(
        getLocalizedText("insertEmail"),
        ui.ButtonSet.OK_CANCEL
      );
      if (
        namePrompt.getSelectedButton() == ui.Button.OK &&
        emailPrompt.getSelectedButton() == ui.Button.OK
      ) {
        SpreadsheetApp.getActive()
          .getSheetByName(Constants.sheetNames.students)
          .appendRow([
            namePrompt.getResponseText(),
            emailPrompt.getResponseText(),
          ]);
      }
    }
  }
}
