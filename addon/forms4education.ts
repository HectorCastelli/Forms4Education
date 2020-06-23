/**
 * The event handler triggered when installing the add-on.
 * @see onOpen
 * @param {Event} e The onInstall event.
 */
function onInstall(e: GoogleAppsScript.Events.AddonOnInstall) {
  onOpen(e);
}

function onOpen(e: GoogleAppsScript.Events.SheetsOnOpen) {
  Forms4Education.UI.createAddOnMenu();
}
