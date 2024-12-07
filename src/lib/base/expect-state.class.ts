/**
 * @class
 * @classdesc Manages expectation state.
 */
export class ExpectState {
  /**
   * @description Returns the state of `already`.
   * @public
   * @readonly
   * @type {boolean}
   */
  public get already(): boolean {
    return this.#already;
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
        this.#already = false;
        return this;
      },
      not: (): this => {
        this.#not = false;
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
          this.#already = true;
          return this;
        },
        false: (): this => {
          this.#already = false;
          return this;
        }
      },
      not: {
        true: (): this => {
          this.#not = true;
          return this;
        },
        false: (): this => {
          this.#not = false;
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
    return this.#not;
  }

  /**
   * @description
   * @type {boolean}
   */
  #already = false;
 
  /**
   * @description Privately stored state of `not`.
   * @type {boolean}
   */
  #not = false;

  /**
   * @description
   * @public
   * @returns {this}
   */
  public reset(): this {
    this.#already = false;
    this.#not = false;
    return this;
  }
}
