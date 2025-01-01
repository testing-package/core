import {} from "jasmine";
// Class.
import { ExpectState } from "./expect-state.class";
// Type.
import { ExpectType } from '../../type';
/**
 * @description
 * @export
 * @class Expect
 * @classdesc Manages expect.
 */
export class Expect {
  /**
   * @description Fail as soon as possible if the actual is pending. Otherwise evaluate the matcher.
   * @public
   * @readonly
   * @type {this}
   */
  public get already(): this {
    this.#state.set.already.true();
    return this;
  }

  /**
   * @description Invert the matcher.
   * @public
   * @readonly
   * @type {this}
   */
  public get not(): this {
    this.#state.set.not.true();
    return this;
  }
  
  /**
   * @description Returns an instance of child class.
   * @public
   * @readonly
   * @type {ExpectState}
   */
  public get state(): ExpectState {
    return this.#state;
  }

  // Additional context to show when the matcher fails.
  #expectationFailOutput?: string;

  /**
   * @description
   * @type {ExpectState}
   */
  #state = new ExpectState();

  /**
   * @description - Wrapper method for the `expect()` function of jasmine.
   * @public
   * @template T
   * @param {ExpectType<T>} actual The value of a type captured from the `actual` that is passed to the `expect()` function of jasmine.
   * @param {string} [expectationFailOutput=this.#expectationFailOutput]
   * @param {*} [e=expectationFailOutput
   *       ? expect(actual).withContext(expectationFailOutput)
   *       : expect(actual)]
   * @returns {jasmine.Matchers<ExpectType<T>>} = The returned value is an `object` of jasmine matchers to use.
   */
  public expect<T>(
    actual: ExpectType<T>,
    expectationFailOutput = this.#expectationFailOutput,
    e = expectationFailOutput
      ? expect(actual).withContext(expectationFailOutput)
      : expect(actual)
  ): jasmine.Matchers<ExpectType<T>> {
    return this.#state.not === true ? e.not : e;
  }

  /**
   * @description
   * @protected
   * @template T
   * @param {ExpectType<T>} actual
   * @param {(matchers: jasmine.Matchers<ExpectType<T>>) => any} callbackfn
   * @param {?*} [expectationFailOutput]
   * @returns {this}
   */
  protected expectation<T>(
    actual: ExpectType<T>,
    callbackfn: (matchers: jasmine.Matchers<ExpectType<T>>) => any,
    expectationFailOutput?: any,
  ): this {
    callbackfn && callbackfn(this.expect(actual, expectationFailOutput));
    return this;
  }

  /**
   * @description
   * @public
   * @template T
   * @template U
   * @param {(T | PromiseLike<T>)} actual
   * @param {string} [expectationFailOutput=this.#expectationFailOutput]
   * @param {?boolean} [not]
   * @param {?boolean} [already]
   * @param {*} [e=expectationFailOutput
   *       ? expectAsync(actual).withContext(expectationFailOutput)
   *       : expectAsync(actual)]
   * @returns {jasmine.AsyncMatchers<T, U>}
   */
  public expectAsync<T, U>(
    actual: T | PromiseLike<T>,
    expectationFailOutput = this.#expectationFailOutput,
    not?: boolean,
    already?: boolean,
    e = expectationFailOutput
      ? expectAsync(actual).withContext(expectationFailOutput)
      : expectAsync(actual)
  ): jasmine.AsyncMatchers<T, U> {
    typeof already === 'boolean' && already === true && this.already;
    typeof not === 'boolean' && not === true && this.not;
    return this.#state.not === true
      ? this.#state.already === true ? e.not.already : e.not
      : this.#state.already === true ? e.already : e;
  }

  /**
   * @description Returns the `already` state.
   * @public
   * @returns {boolean} The returned value is `already` state.
   */
  public getAlready() {
    return this.#state.already;
  }

  /**
   * @description Returns the `not` state.
   * @public
   * @returns {boolean} The returned value is `not` state.
   */
  public getNot() {
    return this.#state.not;
  }
  
  /**
   * @description
   * @public
   * @param {string} message
   * @returns {this}
   */
  public withContext(message: string) {
    message && (this.#expectationFailOutput = message);
    return this;
  }
}
