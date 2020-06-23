/**
 * This file needs to have all functions that need to rum from the clientSide.
 */

/**
 * Creates a new Test
 *
 * @see Forms4Education.Tests.insertTest
 *
 * @param {{
 *   testName: string;
 *   startDate: Date;
 *   endDate: Date;
 *   student: string[];
 *   questionBanks: string[];
 * }} formData Data from the form to create a new Test
 */
function insertTest(formData: {
  testName: string;
  startDate: Date;
  endDate: Date;
  student: string[];
  questionBanks: string[];
}) {
  Forms4Education.Tests.insertTest(formData);
}
