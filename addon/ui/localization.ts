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
    LanguageApp.translate(localizedStrings[textKey]["en"], "en",pt_br: "", locale);
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
    pt_br: "Cancelar",
  },
  createNew: {
    en: "Create",
    pt_br: "Criar",
  },
  delete: {
    en: "Remove",
    pt_br: "Remover",
  },
  insertName: {
    en: "Insert the Name",
    pt_br: "Inserir o Nome",
  },
  insertLink: {
    en: "Insert the Link",
    pt_br: "Inserir o Link",
  },
  insertEmail: {
    en: "Insert the Email",
    pt_br: "Inserir o Email",
  },
  initializeSpreadsheet: {
    en: "Initialize Add-On",
    pt_br: "Inicializer o Add-On",
  },
  questionBank: {
    en: "Question Banks",
    pt_br: "Banco de Questões",
  },
  student: {
    en: "Students",
    pt_br: "Estudantes",
  },
  test: {
    en: "Tests",
    pt_br: "Provas",
  },
  help: {
    en: "Help",
    pt_br: "Ajuda",
  },
  generalHelp: {
    en: "General Help",
    pt_br: "Ajuda Geral",
  },
  studentTestId: {
    en: "Your Test ID",
    pt_br: "Seu ID de Prova",
  },
  studentTestIdDescription: {
    en: "Insert your unique Test ID here to identify your answer.",
    pt_br: "Insira seu ID de Prova unico aqui para identificar suas respostas.",
  },
  startDate: {
    en: "Start Date",
    pt_br: "Data de Início",
  },
  endDate: {
    en: "End Date",
    pt_br: "Data de Fim",
  },
  name: {
    en: "Name",
    pt_br: "Nome",
  },
  email: {
    en: "Email",
    pt_br: "Email",
  },
  weight: {
    en: "Weight",
    pt_br: "Peso",
  },
  sent: {
    en: "Sent",
    pt_br: "Enviado",
  },
  mandatoryQuestions: {
    en: "Mandatory Questions",
    pt_br: "Questões Obrigatórias",
  },
  optionalQuestions: {
    en: "Optional Questions",
    pt_br: "Questões Opcionais",
  },
  applyTest: {
    en: "Apply Test $testname now.",
    pt_br: "Applicar prova $testname agora.",
  },
};
