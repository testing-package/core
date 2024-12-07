// Class.
import { TestingSpec } from './testing-spec.class';
// Interface.
import { TestingConfig } from '../interface';
/**
 * @description
 * @export
 * @abstract
 * @class TestingTest
 * @typedef {TestingTest}
 */
export abstract class TestingTest {
  /**
   * @description
   * @protected
   * @type {*}
   */
  protected _spec;

  /**
   * Creates an instance of `TestingTest`.
   * @constructor
   * @param {?boolean} [execute]
   * @param {?(number | number[])} [executable]
   * @param {?('auto' | 'manual' |  'off')} [number]
   * @param {?Omit<TestingConfig, 'suite'>} [testing]
   */
  constructor(
    execute?: boolean,
    executable?: number | number[],
    number?: 'auto' | 'manual' |  'off',
    testing?: Omit<TestingConfig, 'suite'>
  ) {
    this._spec = testing?.spec ? testing.spec : new TestingSpec(execute, executable, undefined, number);
  }
}
