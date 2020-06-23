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
        .addItem("Initialize Spreadsheet", "Forms4Education.Sheet.initialize")
        .addSeparator()
        .addSubMenu(
          ui
            .createMenu("Help")
            .addItem("General Help", "Forms4Education.Help.showManual")
        )
        .addToUi();
    }
  }
}
