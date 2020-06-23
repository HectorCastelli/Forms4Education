import { getLocalizedText } from "./localization";

namespace Forms4Education {
  export namespace UI {
    /**
     * Creates Add-On menu for the current Spreadsheet
     *
     * @export
     */
    export function createAddOnMenu(): void {
      const ui = SpreadsheetApp.getUi();
      ui.createAddonMenu()
        .addSubMenu(
          ui
            .createMenu(getLocalizedText("questionBank"))
            .addItem(
              getLocalizedText("createNew"),
              "Forms4Education.QuestionBanks.createQuestionBank"
            )
        )
        .addSubMenu(
          ui
            .createMenu(getLocalizedText("student"))
            .addItem(
              getLocalizedText("createNew"),
              "Forms4Education.Students.createStudent"
            )
        )
        .addSubMenu(
          ui
            .createMenu(getLocalizedText("test"))
            .addItem(
              getLocalizedText("createNew"),
              "Forms4Education.Tests.createTest"
            )
        )
        .addSeparator()
        .addSubMenu(
          ui
            .createMenu(getLocalizedText("help"))
            .addItem(
              getLocalizedText("generalHelp"),
              "Forms4Education.Help.showManual"
            )
        )
        .addToUi();
    }

    /**
     * Creates a prompt to the user explaining what they need to do in order to enable the addon, and therefore correctly initialize it.
     *
     * @export
     */
    export function askUserToEnableAddon(): void {
      const ui = SpreadsheetApp.getUi();
      ui.alert(
        "Forms4Education not enabled in this document!",
        `Please, go to "Add-ons" and then "Manage add-ons".
        Find the Forms4Education entry and click "Options" then "Use in this document" to enable it.`,
        ui.ButtonSet.OK
      );
    }
  }
}
