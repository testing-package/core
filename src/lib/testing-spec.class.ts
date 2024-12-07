// Class.
import { DescriptionTemplate } from './base/description-template.class';
import { TestingExecutable } from './testing-executable.abstract';
/**
 * Creates an instance with optional allowed executing methods and executable storage.
 * @description
 * @export
 * @class TestingSpec
 * @classdesc Manages specs.
 * @typedef {TestingSpec}
 * @template {string} [Expectations=string]
 * @extends {TestingExecutable}
 */
export class TestingSpec<
  Expectations extends string = string,
> extends TestingExecutable {
  /**
   * @description Defines the wrapper function for the `it()` function of jasmine with the ability to decide its execution.
   * @param expectation "Textual description of what this spec is checking"
   * @param assertion "Function that contains the code of your test. If not provided the test will be pending."
   * @param timeout "Custom timeout for an async spec."
   * @returns The returned value is a `function` that contains the predefined `it()` function of jasmine with the
   * ability to decide its execution.
   */
  public static define(
    expectation: string,
    assertion: jasmine.ImplementationCallback | (() => void | Promise<void>),
    timeout?: number | undefined
  ) {
    return (execute: boolean = false) => execute === true
      && typeof assertion === 'function'
      && it(expectation, assertion, timeout)
  }

  /**
   * @description Returns an instance of `DescriptionTemplate`.
   * @public
   * @readonly
   * @type {DescriptionTemplate<CounterDescription, Descriptions>}
   * @returns {DescriptionTemplate<CounterDescription, Descriptions>} The current `DescriptionTemplate` instance.
   */
  public get description() {
    return this.#description;
  }

  /**
   * @description A privately stored `DescriptionTemplate` instance.
   * @type {DescriptionTemplate}
   * @private
   */
  #description;

  /**
   * Creates an instance of `TestingSpec`.
   * @constructor
   * @param {?boolean} [execute] - An optional value of a `boolean` to initially allow executing `it()` methods.
   * @param {?(number | number[])} [executable] - An optional `array` of unique numbers type to initially set executable storage.
   * @param {?(Expectations | Expectations[])} [expectations]
   * @param {?('auto' | 'manual' |  'off')} [number]
   */
  constructor(
    execute?: boolean,
    executable?: number | number[],
    expectations?: Expectations | Expectations[],
    number?: 'auto' | 'manual' |  'off'
  ) {
    super(execute, executable);

    // Initialize `DescriptionTemplate` instance.
    this.#description = new DescriptionTemplate(number, expectations, { counter: '[counter]' });
  }

  /**
   * @description
   * @public
   * @template {string} Expectation
   * @param {(Expectations | Expectation)} expectation
   * @param {jasmine.ImplementationCallback} assertion
   * @param {?number} [timeout]
   * @returns {this}
   */
  public fit<Expectation extends string>(
    expectation: Expectations | Expectation,
    assertion: jasmine.ImplementationCallback,
    timeout?: number
  ): this {
    super.counter.increment();
    fit(
      this.description.replace(expectation, `${super.counter.current}`, 'counter'),
      assertion,
      timeout
    );
    return this;
  }

  /**
   * @description Executes defined `it()` function of jasmine on provided state `true` from the `execute`.
   * @public
   * @template {string} Expectation "Textual description of what this spec is checking" with an optional its unique number when adding `[counter]`.
   * @param {(Expectations | Expectation)} expectation "Function that contains the code of your test. If not provided the test will be pending."
   * @param {(jasmine.ImplementationCallback | (() => void | Promise<void>))} assertion A `boolean` type value to decide whether or not execute defined `it()` of jasmine function.
   * @param {boolean} [execute=super.size && super.size > 0
   *       ? is.true(super.allowed) && super.isExecutable(super.counter.current + 1)
   *       : true]
   * @param {?number} [timeout]
   * @returns {this} The returned value is an instance of `TestingSpec`.
   */
  public it<Expectation extends string>(
    expectation: Expectations | Expectation,
    assertion: jasmine.ImplementationCallback | (() => void | Promise<void>),
    execute: boolean = super.size && super.size > 0
      ? super.allowed === true && super.isExecutable(super.counter.current + 1)
      : true,
    timeout?: number
  ): this {
    super.counter.increment();
    TestingSpec.define(
      this.description.replace(expectation, `${super.counter.current}`, 'counter'),
      assertion,
      timeout
    )(execute);
    return this;
  }

  /**
   * @description
   * @public
   * @template {string} Expectation
   * @param {(Expectations | Expectation)} expectation
   * @param {jasmine.ImplementationCallback} assertion
   * @param {?number} [timeout]
   * @returns {this}
   */
  public xit<Expectation extends string>(
    expectation: Expectations | Expectation,
    assertion: jasmine.ImplementationCallback,
    timeout?: number
  ): this {
    super.counter.increment();
    xit(
      this.description.replace(expectation, `${super.counter.current}`, 'counter'),
      assertion,
      timeout
    );
    return this;
  }
}
