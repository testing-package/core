// Class.
import { NumberState } from '@typescript-package/state';
/**
 * @description Counter for testing purposes.
 * @export
 * @class Counter
 * @extends {NumberState}
 */
export class Counter extends NumberState {
  /**
   * @description Current counter value.
   * @public
   * @readonly
   * @type {number}
   */
  public get current(): number {
    return super.state;
  }

  /**
   * Creates an instance of `Counter`.
   * @constructor
   */
  constructor() {
    super(0, 1);
  }

  /**
   * @description Resets counter to `0`.
   * @public
   * @returns {this} The returned value is an instance of a child class.
   */
  public override reset(): this {
    super.reset();
    return this;
  }
}
