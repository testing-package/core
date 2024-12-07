// Class.
import { Expect } from "./base/expect.class";
import { TextualExpectation } from "./textual-expectation.abstract";
// Type.
import { ExpectType } from "../type";
/**
 * @description
 * @export
 * @abstract
 * @class TestingExpect Contains instance of the `Expect`.
 * @typedef {TestingExpect}
 */
export abstract class TestingExpect {
  /**
   * @description Fail as soon as possible if the actual is pending. Otherwise evaluate the matcher.
   */
  public get already(): this {
    this._expect.already;
    return this;
  }

  /**
   * @description Invert the matcher.
   * @public
   * @readonly
   * @type {this}
   */
  public get not(): this {
    this._expect.not;
    return this;
  }

  /**
   * @description
   * @private
   * @type {Expect}
   */
  private _expect;

  /**
   * Creates an instance of `TestingExpect`.
   * @constructor
   * @param {Expect} [expect=new Expect()]
   */
  constructor(expect: Expect = new Expect()) {
    this._expect = expect;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {{ clear: { already: () => this; not: () => this; }; already: () => any; not: () => any; reset: () => this; }}
   */
  public get state() {
    return {
      clear: {
        already: (): this => {
          this._expect.state.clear.already();
          return this;
        },
        not: (): this => {
          this._expect.state.clear.not();
          return this;
        },
      },
      already: () => this._expect.state.already,
      not: () => this._expect.state.not,
      reset: (): this => {
        this._expect.state.reset();
        return this;
      }
    };
  }

  /**
   * 
   * @param actual 
   * @param expectationFailOutput 
   * @returns 
   */
  public expect<T>(
    actual: ExpectType<T>,
    expectationFailOutput?: any,
  ): jasmine.Matchers<ExpectType<T>> {
    return this._expect.expect(actual, expectationFailOutput);
  }

  /**
   * 
   * @param actual 
   * @param expectationFailOutput 
   * @param not 
   * @param already 
   * @returns 
   */
  public expectAsync<T, U>(
    actual: T | PromiseLike<T>,
    expectationFailOutput?: any,
    not?: boolean,
    already?: boolean,
  ): jasmine.AsyncMatchers<T, U> {
    already && this.already;
    not && this.not;
    return this._expect.expectAsync(actual, expectationFailOutput, not, already);
  }

  /**
   * @description
   * @param method 
   * @returns 
   */
  public getExpectationFailOutput<T>(
    method: keyof typeof TextualExpectation.message,
    actual?: ExpectType<T>,
    expected?: any
  ) {
    return TextualExpectation.getFail(method, this._expect.getNot());
  }

  /**
   * TODO:
   * @param invert 
   * @returns 
   */
  public invert(invert: boolean = false) {
    (invert ? this.not : this);
    return this;
  }

  /**
   * @param message 
   */
  public withContext(message: string) {
    message && this._expect.withContext(message);
    return this;
  }

  /**
   * 
   * @param actual 
   * @param callbackfn 
   * @param expectationFailOutput 
   * @returns 
   */
  protected expectation<T>(
    actual: ExpectType<T>,
    callbackfn: (matchers: jasmine.Matchers<ExpectType<T>>) => any,
    expectationFailOutput?: any,
  ): this {
    callbackfn && callbackfn(this.expect(actual, expectationFailOutput));
    return this;
  }
}
