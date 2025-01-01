// Class.
import { Boolean as Already, Boolean as Not } from '@typescript-package/state';
/**
 * @description
 * @export
 * @class ExpectMatcherState
 * @classdesc Manages `already` and `not` expect states of `boolean` type.
 */
export class ExpectState {
  /**
   * @description Returns the state of `already`.
   * @public
   * @readonly
   * @type {boolean}
   */
  public get already(): boolean {
    return this.#already.state;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {{ already: () => this; not: () => this; }}
   */
  public get clear() {
    return {
      already: (): this => {
        this.#already.false();
        return this;
      },
      not: (): this => {
        this.#not.false();
        return this;
      },
    }
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {{ already: { true: () => this; false: () => this; }; not: { true: () => this; false: () => this; }; }}
   */
  public get set() {
    return {
      already: {
        true: (): this => {
          this.#already.true();
          return this;
        },
        false: (): this => {
          this.#already.false();
          return this;
        }
      },
      not: {
        true: (): this => {
          this.#not.true();
          return this;
        },
        false: (): this => {
          this.#not.false();
          return this;
        }
      }
    }
  }
  
  /**
   * @description Returns the state of `not`.
   * @public
   * @readonly
   * @type {boolean}
   */
  public get not(): boolean {
    return this.#not.state;
  }

  /**
   * @description Privately stored state of `already`.
   * @type {boolean}
   */
  #already = new Already(false);
 
  /**
   * @description Privately stored state of `not`.
   * @type {boolean}
   */
  #not = new Not(false);

  /**
   * @description Checks whether expect state is prepared to set `already`.
   * @public
   * @returns {boolean} Returns `already` state of `boolean` type.
   */
  public isAlready(): boolean {
    return this.#already.isTrue();
  }

  /**
   * @description Checks whether expect is prepared to being inverted.
   * @public
   * @returns {boolean} Returns `not` state of `boolean` type.
   */
  public isInverted(): boolean {
    return this.#not.isTrue();
  }

  /**
   * @description Resets states.
   * @public
   * @returns {this}
   */
  public reset(): this {
    this.#already.false();
    this.#not.false();
    return this;
  }
}
