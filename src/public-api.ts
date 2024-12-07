/*
 * Public API Surface of testing
 */
export {
  Random,

  // Class to handle `describe`, `it`, `expect` of jasmine.
  TestingCore,

  // Abstract class to handle executable tests.
  TestingExecutable,

  // Class to handle `expect()` function of jasmine.
  TestingExpect,

  // Full named expectations. Methods with `expect()` + jasmine matchers.
  TestingExpectation,

  // Class to handle `it()` function of jasmine.
  TestingSpec,

  // Class to handle `describe()` function of jasmine.
  TestingSuite,

  // Helper class to build the tests.
  TestingTest,

  // Main class with all testings.
  Testing,

  //
  TextualExpectation,
} from './lib';
