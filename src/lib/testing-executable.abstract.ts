// Class.
import { Counter, Executable } from './base';
/**
 * @description
 * @export
 * @abstract
 * @classdesc Common class for `TestingSuite` and `TestingSpec` with `Counter`.
 * @typedef {TestingExecutable}
 * @extends {Executable}
 */
export abstract class TestingExecutable extends Executable {
  /**
   * @description Returns an instance of `Counter`.
   * @public
   * @readonly
   * @type {Counter}
   * @returns {Counter} The current `Counter` instance.
   */
  public get counter(): Counter {
    return this.#counter;
  }

  /**
   * @description A privately stored `Counter` instance.
   * @type {Counter}
   * @private
   */
  #counter;

  /**
   * Creates an instance of `TestingExecutable`.
   * @description Initializes the class with optional execute state, executable numbers, and counter configuration.
   * @constructor
   * @param {?boolean} [execute] - An optional parameter to set the initial execute state.
   * @param {?(number | number[])} [executable] - Unique `number` or an array of unique numbers for the executable storage.
   */
  constructor(
    execute?: boolean,
    executable?: number | number[],
  ) {
    super(execute, executable);

    // Initialize `Counter` instance.
    this.#counter = new Counter();
  }
}
