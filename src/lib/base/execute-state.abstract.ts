// Class.
import { BooleanState } from './boolean-state.abstract';
/**
 * @abstract
 * @class
 * @classdesc Abstract class manages the execution state of `boolean` type.
 */
export abstract class ExecutionState extends BooleanState {
  /**
   * @description Returns the current execution state.
   * @public
   * @readonly
   * @type {boolean}
   */
  public get allowed(): boolean {
    return super.state;
  }

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

  /**
   * @description Sets the execution state to `true`.
   * @public
   * @returns {this}
   */
  public execute(): this {
    super.true();
    return this;
  }
}
