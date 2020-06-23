/**
 * Returns a localized version of a string based on the current user's Locale.
 * If a locale does not have a string we are looking for, we will use the default 'en' locale.
 *
 * @export
 * @param {string} textKey The Text key from localizedStrings to use
 * @param {Map<string, string>} [replacementValues] An array of strings to be replaced
 */
export function getLocalizedText(
  textKey: string,
  replacementValues?: Map<string, string>
) {
  const locale = Session.getActiveUserLocale() || "en";
  const textToTranslate: string =
    localizedStrings[textKey][locale] ||
    LanguageApp.translate(localizedStrings[textKey]["en"], "en", locale);
  if (replacementValues) {
    let translatedText = textToTranslate;
    for (let [key, value] of replacementValues) {
      translatedText = translatedText.replaceAll(`$${key}`, value);
    }
    return translatedText;
  } else return textToTranslate;
}

const localizedStrings = {
  cancel: {
    en: "Cancel",
  },
  createNew: {
    en: "Create",
  },
  delete: {
    en: "Remove",
  },
  insertName: {
    en: "Insert the Name",
  },
  insertLink: {
    en: "Insert the Link",
  },
  insertEmail: {
    en: "Insert the Email",
  },
  initializeSpreadsheet: {
    en: "Initialize Add-On",
  },
  questionBank: {
    en: "Question Banks",
  },
  student: {
    en: "Students",
  },
  test: {
    en: "Tests",
  },
  help: {
    en: "Help",
  },
  generalHelp: {
    en: "General Help",
  },
  studentTestId: {
    en: "Your Test ID",
  },
  studentTestIdDescription: {
    en: "Insert your unique Test ID here to identify your answer.",
  },
  startDate: {
    en: "Start Date",
  },
  endDate: {
    en: "End Date",
  },
  applyTest: {
    en: "Apply Test $testname now.",
  },
};
