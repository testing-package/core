// Class.
import { BooleanState } from './boolean-state.abstract';
/**
 * @description Counter for testing purposes.
 * @export
 * @class Counter
 * @typedef {Counter}
 * @extends {BooleanState}
 */
export class Counter extends BooleanState {
  /**
   * @description Status of counter.
   * @public
   * @readonly
   * @type {boolean}
   */
  public get active(): boolean {
    return super.state;
  }

  /**
   * @description Current counter value.
   * @public
   * @readonly
   * @type {number}
   */
  public get current(): number {
    return this.#value;
  }

  /**
   * @description
   * @type {number}
   */
  #incrementSize: number;

  /**
   * @description Privately stored counter, which by default is set to `0`.
   * @type {number}
   */
  #value;

  /**
   * Creates an instance of `Counter`.
   * @constructor
   * @param {boolean} [active=true]
   * @param {number} [value=0]
   * @param {number} [incrementSize=1]
   */
  constructor(active: boolean = true, value = 0, incrementSize = 1) {
    super(active);
    this.#value = value;
    this.#incrementSize = incrementSize;
  }

  /**
   * @description Gets the actual counter.
   * @public
   * @returns {number}
   */
  public get(): number {
    return this.#value;
  }

  /**
   * @description Increase the counter by `1`.
   * @public
   * @param {number} [amount=this.#incrementSize]
   * @returns {this} The returned value is an instance of a child class.
   */
  public increment(amount: number = this.#incrementSize): this {
    this.#value += amount;
    return this;
  }
  
  /**
   * @description Resets counter to `0`.
   * @public
   * @returns {this} The returned value is an instance of a child class.
   */
  public reset(): this {
    this.#value = 0;
    return this;
  }
}
