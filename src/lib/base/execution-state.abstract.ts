// Class.
import { BooleanState } from '@typescript-package/state';
/**
 * @description
 * @export
 * @abstract
 * @class ExecutionState
 * @classdesc Abstract class manages the execution state of `boolean` type.
 * @extends {BooleanState}
 */
export abstract class ExecutionState extends BooleanState {
  /**
   * @description Returns the current execution state.
   * @public
   * @readonly
   * @type {boolean}
   */
  public get execution(): boolean {
    return super.state;
  }

  /**
   * @description Sets the execution state to `true`.
   * @public
   * @returns {this}
   */
  public allow(): this {
    super.true();
    return this;
  }

  /**
   * @description Sets the execution state to `false`.
   * @public
   * @returns {this}
   */
  public disallow(): this {
    super.false();
    return this;
  }
}
