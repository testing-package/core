// Class.
import { DescriptionTemplate } from './base/description-template.class';
import { TestingExecutable } from './testing-executable.abstract';
/**
 * Creates an instance of TestingSuite`.
 * @description
 * @export
 * @class TestingSuite
 * @classdesc Manages suite.
 * @typedef {TestingSuite}
 * @template {string} [Descriptions=string]
 * @extends {TestingExecutable}
 */
export class TestingSuite<
  Descriptions extends string = string,
> extends TestingExecutable {
  /**
   * @description Defines the wrapper function for the `describe()` function of jasmine with the ability to decide its execution.
   * @public
   * @static
   * @param {string} description - "Textual description of the group" with a defined prefix indicating its unique number.
   * @param {() => void} specDefinitions - "Function for Jasmine to invoke that will define"
   * @returns {(execute: boolean) => void} The returned value is a `function` that contains `describe()` of jasmine with the ability to decide of its execution.
   */
  public static define(
    description: string,
    specDefinitions: () => void
  ): (execute: boolean) => void {
    return (execute: boolean = false) => execute === true
      && describe(description, specDefinitions);
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
   * Creates an instance of `TestingSuite`.
   * @constructor
   * @param {?boolean} [execute] - An optional value of a `boolean` whether to execute `describe()` methods.
   * @param {?(number | number[])} [executable] - An optional `array` of unique numbers type to initially set executable `describe()` methods of counter numbers.
   * @param {?(Descriptions | Descriptions[])} [descriptions]
   * @param {?('auto' | 'manual' |  'off')} [number]
   */
  constructor(
    execute?: boolean,
    executable?: number | number[],
    descriptions?: Descriptions | Descriptions[],
    number?: 'auto' | 'manual' |  'off'
  ) {
    super(execute, executable);

    // Initialize `DescriptionTemplate` instance.
    this.#description = new DescriptionTemplate(number, descriptions, {counter: '[counter]'});
  }

  /**
   * @description Executes defined `describe()` function of jasmine on provided state `true` from the `execute`.
   * @public
   * @template {string} Description
   * @param {(Descriptions | Description)} description - "Textual description of the group" with an optional its unique number when adding `[counter]`.
   * @param {() => void} specDefinitions - "Function for Jasmine to invoke that will define inner suites a specs"
   * @param {boolean} [execute=super.size && super.size > 0
   *       ? is.true(this.allowed) && super.isExecutable(super.counter.current + 1)
   *       : true] - A `boolean` type value to decide whether or not execute defined `describe()` of jasmine function.
   * @returns {this} The returned value is an instance of `TestingSuite`.
   */
  public describe<Description extends string>(
    description: Descriptions | Description,
    specDefinitions: () => void,
    execute: boolean = super.size && super.size > 0
      ? this.allowed === true && super.isExecutable(super.counter.current + 1)
      : true
  ): this {
    super.counter.increment();
    TestingSuite.define(
      this.description.replace(description, `${super.counter.current}`, 'counter'),
      specDefinitions
    )(execute);
    return this;
  }

  /**
   * @description
   * @public
   * @template {string} Description
   * @param {(Descriptions | Description)} description
   * @param {() => void} specDefinitions
   * @returns {this}
   */
  public fdescribe<Description extends string>(
    description: Descriptions | Description,
    specDefinitions: () => void,
  ): this {
    super.counter.increment();
    fdescribe(
      this.description.replace(description, `${super.counter.current}`, 'counter'),
      specDefinitions
    );
    return this;
  }

  /**
   * @description
   * @public
   * @template {string} Description
   * @param {(Descriptions | Description)} description
   * @param {() => void} specDefinitions
   * @returns {this}
   */
  public xdescribe<Description extends string>(
    description: Descriptions | Description,
    specDefinitions: () => void,
  ): this {
    super.counter.increment();
    xdescribe(
      this.description.replace(description, `${super.counter.current}`, 'counter'),
      specDefinitions
    );
    return this;
  }
}
