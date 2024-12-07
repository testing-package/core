/**
 * @description
 * @export
 * @abstract
 * @class BooleanState
 * @typedef {BooleanState}
 */
export abstract class BooleanState {
  /**
   * @description
   * @public
   * @readonly
   * @type {boolean}
   */
  protected get state(): boolean {
    return this.#state;
  }

  /**
   * @description
   * @type {boolean}
   */
  #state: boolean = true;

  /**
   * Creates an instance of `BooleanState`.
   * @constructor
   * @param {?boolean} [state]
   */
  constructor(state?: boolean) {
    typeof state === 'boolean' && (this.#state = state);
  }

  /**
   * @description
   * @protected
   * @returns {this}
   */
  protected false(): this {
    this.#state = false;
    return this;
  }

  /**
   * @description
   * @protected
   * @returns {this}
   */
  protected toggle(): this {
    this.#state = !this.#state;
    return this;
  }

  /**
   * @description
   * @protected
   * @returns {this}
   */
  protected true(): this {
    this.#state = true;
    return this;
  }
}