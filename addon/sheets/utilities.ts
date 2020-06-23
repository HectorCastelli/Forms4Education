namespace Forms4Education {
  export namespace Sheets {
    /**
     * Sets a Sheet to be X by Y cells
     *
     * @export
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
     * @param {number} x Desired Width
     * @param {number} y Desired Height
     */
    export function setSheetDimensions(
      sheet: GoogleAppsScript.Spreadsheet.Sheet,
      x: number,
      y: number
    ): void {
      if (sheet.getMaxColumns() > x) {
        sheet.deleteColumns(x, sheet.getMaxColumns() - x);
      } else if (sheet.getMaxColumns() < x) {
        sheet.insertColumns(sheet.getMaxColumns(), sheet.getMaxColumns() - x);
      }
      if (sheet.getMaxRows() > y) {
        sheet.deleteRows(y, sheet.getMaxRows() - y);
      } else if (sheet.getMaxRows() < y) {
        sheet.insertRows(sheet.getMaxRows(), sheet.getMaxRows() - y);
      }
    }
  }
}
