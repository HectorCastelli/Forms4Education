import { getLocalizedText } from "../ui/localization";

class QuestionBank {
  name: string = "";
  driveFolder: GoogleAppsScript.Drive.Folder;
  forms: GoogleAppsScript.Forms.Form[] = [];

  constructor(name: string, driveFolderUrl: string) {
    this.name = name;
    this.load(driveFolderUrl);
  }

  /**
   * Loads data to a QuestionBank based on a Drive folder URL
   *
   * @param {string} driveFolderUrl The URL of the Drive Folder to load from
   * @memberof QuestionBank
   */
  load(driveFolderUrl: string) {
    const folderId = <string>driveFolderUrl.toString().split("/").pop();
    this.driveFolder = DriveApp.getFolderById(folderId);
    const formsInFolder = this.driveFolder.getFilesByType(
      MimeType.GOOGLE_FORMS
    );
    while (formsInFolder.hasNext()) {
      const form = formsInFolder.next();
      this.forms.push(FormApp.openById(form.getId()));
    }
  }

  /**
   * Validates that all Forms that compose a QuestionBank have the necessary settings
   *
   * @memberof QuestionBank
   */
  validate() {
    this.forms.forEach((formFile) => {
      formFile.setCollectEmail(true); // To prevent another student from using a test ID from another student
      formFile.setAllowResponseEdits(false); // Locks editing of responses. For new responses, submit a new form.
      formFile.setLimitOneResponsePerUser(false); // Allows multiple responses per user. Related to point above.
      formFile.setShuffleQuestions(false); // Disables question shuffling, guaranteeing that the Test ID question will be always on top.
      formFile // Sets all questions that are not the Test ID question to optional so students can submit blank responses.
        .getItems()
        .filter((item) => item.getTitle() !== getLocalizedText("studentTestId"))
        .forEach((item) => {
          switch (item.getType()) {
            case FormApp.ItemType.CHECKBOX:
              item.asCheckboxItem().setRequired(false);
              break;
            case FormApp.ItemType.CHECKBOX_GRID:
              item.asCheckboxGridItem().setRequired(false);
              break;
            case FormApp.ItemType.DATE:
              item.asDateItem().setRequired(false);
              break;
            case FormApp.ItemType.DATETIME:
              item.asDateItem().setRequired(false);
              break;
            case FormApp.ItemType.DURATION:
              item.asDurationItem().setRequired(false);
              break;
            case FormApp.ItemType.GRID:
              item.asGridItem().setRequired(false);
              break;
            case FormApp.ItemType.LIST:
              item.asListItem().setRequired(false);
              break;
            case FormApp.ItemType.MULTIPLE_CHOICE:
              item.asMultipleChoiceItem().setRequired(false);
              break;
            case FormApp.ItemType.PARAGRAPH_TEXT:
              item.asParagraphTextItem().setRequired(false);
              break;
            case FormApp.ItemType.SCALE:
              item.asScaleItem().setRequired(false);
              break;
            case FormApp.ItemType.TEXT:
              item.asTextItem().setRequired(false);
              break;
            case FormApp.ItemType.TIME:
              item.asTimeItem().setRequired(false);
              break;
            case FormApp.ItemType.IMAGE:
            case FormApp.ItemType.PAGE_BREAK:
            case FormApp.ItemType.SECTION_HEADER:
            case FormApp.ItemType.VIDEO:
            default:
              //Do Nothing
              break;
          }
        });
      //TODO: Add option to set quiz feedback to Manual after review (Pending FR with Google: https://issuetracker.google.com/issues/159665379)
      //Add the Test ID question to the form if it didn't exist yet.
      if (
        formFile.getItems(FormApp.ItemType.TEXT).filter((item) => {
          return (
            item.asTextItem().getTitle() === getLocalizedText("studentTestId")
          );
        }).length === 0
      ) {
        const idItem = formFile
          .addTextItem()
          .setRequired(true)
          .setTitle(getLocalizedText("studentTestId"))
          .setHelpText(getLocalizedText("studentTestIdDescription"));
        idItem.setRequired(true);
        formFile.moveItem(idItem.getIndex(), 0);
      }
    });
  }

  /**
   * Returns n number of Forms from a Question Bank
   *
   * @param {number} n How may Items from the Question Bank should be returned
   * @returns {GoogleAppsScript.Forms.Form[]}
   * @memberof QuestionBank
   */
  selectItems(n: number): GoogleAppsScript.Forms.Form[] {
    let result = new Array(n),
      length = this.forms.length,
      taken = new Array(length);
    if (n > length)
      throw new RangeError(
        "getRandomFromArray: <n> is larger than length of <this.forms>"
      );
    while (n--) {
      const x = Math.floor(Math.random() * length);
      result[n] = this.forms[x in taken ? taken[x] : x];
      taken[x] = --length in taken ? taken[length] : length;
    }
    return result;
  }
}
namespace Forms4Education {
  export namespace QuestionBanks {
    /**
     * Initializes the Spreadsheet tabs required for Question Banks functionality
     *
     * @export
     */
    export function initializeQuestionBankSheet() {
      const currentSpreadsheet = SpreadsheetApp.getActive()!;
      if (
        currentSpreadsheet.getSheetByName(Constants.sheetNames.questionBank) ==
        null
      ) {
        const newQuestionBankSheet = currentSpreadsheet.insertSheet(
          Constants.sheetNames.questionBank
        );
        Forms4Education.Sheets.setSheetDimensions(newQuestionBankSheet, 2, 1);
        newQuestionBankSheet
          .getRange(1, 1, 1, 2)
          .setValues([["Name", "Drive Folder Link"]]);
      }
    }

    /**
     * Loads all Question Banks definitions from the Spreadsheet
     *
     * @export
     * @returns {QuestionBank[]}
     */
    export function loadQuestionBanksFromSheet(): QuestionBank[] {
      return SpreadsheetApp.getActive()
        .getSheetByName(Constants.sheetNames.questionBank)
        .getDataRange()
        .getValues()
        .slice(1)
        .map((row) => new QuestionBank(row[0], row[1]));
    }
  }
}
