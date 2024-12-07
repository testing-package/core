// Class.
import { ExecuteState } from './execute-state.abstract';
/**
 * Initialize executable storage.
 * @exports
 * @abstract
 * @class
 * @classdesc Manages the `Set` executable tests storage of numbers.
 */
export abstract class Executable extends ExecuteState {
  /**
   * @description Returns the `SetIterator` of unique numbers allowed to execute.
   * @public
   * @readonly
   * @type {(SetIterator<number> | undefined)}
   */
  public get executable() {
    return this.#executable?.values();
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {(number | undefined)}
   */
  public get size(): number | undefined {
    return this.#executable?.size;
  }

  /**
   * @description An instance `Set` of unique numbers allowed to execute.
   * @type {?Set<number>}
   */
  #executable?: Set<number>;
  
  /**
   * Creates an instance of `TestingExecutable`.
   * @description Initializes the executable storage of unique numbers.
   * @constructor
   * @param {?boolean} [execute] - An optional parameter to set the initial execute state.
   * @param {?Executable} [executable] - An optional `array` of unique numbers or `number` to populate the executable storage to execute.
   */
  constructor(
    execute?: boolean,
    executable?: number | number[],
  ) {
    super(execute);
    typeof executable !== 'undefined' && (this.#executable = new Set(!Array.isArray(executable) ? [executable] : executable));
  }

  /**
   * @description Checks whether the provided `uniqueNumber` exists in the executable storage.
   * @public
   * @param {number} uniqueNumber - The number to check in the executable storage.
   * @returns {boolean} The returned value is a `boolean` type indicating whether the provided `uniqueNumber` exists in the executable storage.
   */
  public isExecutable(uniqueNumber: number): boolean {
    return this.#executable ? this.#executable.has(uniqueNumber) : false;
  }
}
