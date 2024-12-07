// Class.
import { BooleanState } from './boolean-state.abstract';
/**
 * @abstract
 * @class
 * @classdesc Abstract class manages the execute state of `boolean` type.
 */
export abstract class ExecuteState extends BooleanState {
  /**
   * @description Returns the current execute state.
   * @public
   * @readonly
   * @type {boolean}
   */
  public get allowed(): boolean {
    return super.state;
  }

  /**
   * @description Returns the current execute state.
   * @public
   * @readonly
   * @type {boolean}
   */
  public get execute(): boolean {
    return super.state;
  }

  /**
   * @description Sets the execute state to `true`.
   * @public
   * @returns {this}
   */
  public allow(): this {
    super.true();
    return this;
  }

  /**
   * @description Sets the execute state to `false`.
   * @public
   * @returns {this}
   */
  public disallow(): this {
    super.false();
    return this;
  }
}
