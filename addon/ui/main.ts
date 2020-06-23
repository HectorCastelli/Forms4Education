import { getLocalizedText, localizationKeys } from "./localization";

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
        .addItem(
          getLocalizedText("initializeSpreadsheet"),
          "Forms4Education.Sheet.initialize"
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
  }
}
