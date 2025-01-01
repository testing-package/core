// Class.
import { NumberState } from '@typescript-package/state';
/**
 * @description Identification for testing purposes.
 * @export
 * @class NumberIdentification
 * @extends {NumberState}
 */
export class NumberIdentification extends NumberState {
  /**
   * @description Current identification value.
   * @public
   * @readonly
   * @type {number}
   */
  public get current(): number {
    return super.state;
  }

  /**
   * Creates an instance of `NumberIdentification`.
   * @constructor
   */
  constructor() {
    super(0, 1);
  }

  /**
   * @description Resets number identification to `0`.
   * @public
   * @returns {this} The returned value is an instance of a child class.
   */
  public override reset(): this {
    super.reset();
    return this;
  }
}
