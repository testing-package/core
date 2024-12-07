// Class.
import { Expect } from './base/expect.class';
import { TestingSpec } from './testing-spec.class';
import { TestingSuite } from './testing-suite.class';
// Interface.
import { TestingOptions } from '../interface';
/**
 * @abstract
 * @class
 * @classdesc Core object with describe and it instances.
 */
export abstract class TestingCore<
  Descriptions extends string = string,
  Expectations extends string = string,
> {
  /**
   * @description
   * @public
   * @readonly
   * @type {('auto' | 'manual' |  'off')}
   */
  public get number(): 'auto' | 'manual' |  'off' {
    return this._number;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Expect}
   */
  public get expect() {
    return this._expect;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {TestingSpec<Expectations>}
   */
  public get spec() {
    return this._testingSpec;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {TestingSuite<Descriptions>}
   */
  public get suite() {
    return this._testingSuite;
  }

  /**
   * @description A privately stored instance of a `TestingSpec`.
   * @protected
   * @type {TestingSpec<Expectations>}
   */
  protected _testingSpec: TestingSpec<Expectations>;

  /**
   * @description Counter config.
   * @protected
   * @type
   */
  private _number;

  /**
   * @description
   * @private
   * @type {*}
   */
  private _expect;

  /**
   * @description A privately stored instance of a `TestingSuite`.
   * @private
   * @type {TestingSuite<Descriptions>}
   */
  private _testingSuite: TestingSuite<Descriptions>;

  /**
   * Creates an instance of `TestingCore`.
   * @constructor
   * @param {Execute} [execute=true]
   * @param {?Textual<Descriptions, Expectations>} [textual]
   * @param {?('auto' | 'manual' |  'off')} [number]
   * @param {?TestingConfig<Descriptions, Expectations>} [testing]
   */
  constructor(
    execute: boolean | { suite?: boolean, spec?: boolean } = true,
    {}: TestingOptions<Descriptions, Expectations> = {}
  ) {
    const { executable, descriptions, expectations, number, testing } = {
      ...arguments[1] as ConstructorParameters<typeof TestingCore<Descriptions, Expectations>>[1]
    };

    // Testing instances.
    const { expect, spec, suite } = {
      ...{
        suite: new TestingSuite<Descriptions>(
          typeof execute === 'boolean' ? execute : execute?.suite,
          executable?.suite,
          descriptions,
          number
        ),
        spec: new TestingSpec<Expectations>(
          typeof execute === 'boolean' ? execute : execute?.spec,
          executable?.spec,
          expectations,
          number
        ),
        expect: new Expect()
      },
      ...testing
    };
    this._expect = expect;
    this._number = number || 'manual';
    this._testingSpec = spec;
    this._testingSuite = suite;
  }
  
  /**
   * @description
   * @public
   * @param {jasmine.ImplementationCallback} action
   * @param {?number} [timeout]
   * @param {boolean} [execute=true]
   * @returns {this}
   */
  public afterAll(
    action: jasmine.ImplementationCallback,
    timeout?: number,
    execute: boolean = true
  ): this {
    (execute => execute && afterAll(action, timeout))(execute);
    return this;
  }

  /**
   * @description
   * @public
   * @param {jasmine.ImplementationCallback} action
   * @param {?number} [timeout]
   * @param {boolean} [execute=true]
   * @returns {this}
   */
  public afterEach(
    action: jasmine.ImplementationCallback,
    timeout?: number,
    execute: boolean = true
  ): this {
    (execute => execute && afterEach(action, timeout))(execute);
    return this;
  }

  /**
   * @description
   * @public
   * @param {jasmine.ImplementationCallback} action
   * @param {?number} [timeout]
   * @param {boolean} [execute=true]
   * @returns {this}
   */
  public beforeAll(
    action: jasmine.ImplementationCallback,
    timeout?: number,
    execute: boolean = true
  ): this {
    (execute => execute && beforeAll(action, timeout))(execute);
    return this;
  }

  /**
   * @description
   * @public
   * @param {jasmine.ImplementationCallback} action
   * @param {?number} [timeout]
   * @param {boolean} [execute=true]
   * @returns {this}
   */
  public beforeEach(
    action: jasmine.ImplementationCallback,
    timeout?: number,
    execute: boolean = true
  ): this {
    (execute => execute && beforeEach(action, timeout))(execute);
    return this;
  }

  /**
   * @description Executes defined `describe()` function of jasmine on provided state `true` from the `execute`, and resets the counter to `0`.
   * @param description "Textual description of the group" with an optional defined prefix indicating its unique number
   * inside the describe.
   * @param specDefinitions "Function for Jasmine to invoke that will define inner suites a specs"
   * @param execute A `boolean` type value to decide whether or not execute defined `describe()` of jasmine function.
   * @returns The return value is an instance of a child class.
   */
  public describe<Description extends string>(
    description: Descriptions | Description,
    specDefinitions: () => any,
    execute?: boolean
  ): this {
    this.spec.counter.reset();
    this.suite.describe(
      description,
      specDefinitions,
      execute
    );
    return this;
  }

  /**
   * @description
   * @public
   * @template {string} Description
   * @param {(Descriptions | Description)} description
   * @param {() => any} specDefinitions
   * @returns {this}
   */
  public fdescribe<Description extends string>(
    description: Descriptions | Description,
    specDefinitions: () => any,
  ): this {
    this.spec.counter.reset();
    this.suite.fdescribe(
      description,
      specDefinitions,
    );
    return this;
  }

  /**
   * @description Executes `it()` function of jasmine on provided state `true` from the `execute`.
   * @param expectation "Textual description of what this spec is checking" with an optional its unique number when adding `[counter]`.
   * @param assertion "Function that contains the code of your test. If not provided the test will be pending."
   * @param execute A `boolean` type value to decide whether or not execute defined `it()` of jasmine function.
   * @returns The return value is an instance of a child class.
   */
  public it<Expectation extends string>(
    expectation: Expectations | Expectation,
    assertion: jasmine.ImplementationCallback,
    execute?: boolean
  ): this {
    this.spec.it(expectation, assertion, execute);
    return this;
  }
  
  /**
   * @description
   * @public
   * @param {string} key
   * @param {unknown} value
   * @returns {this}
   */
  public setSpecProperty(key: string, value: unknown) {
    setSpecProperty(key, value);
    return this;
  }

  /**
   * @description
   * @public
   * @param {string} key
   * @param {unknown} value
   * @returns {this}
   */
  public setSuiteProperty(key: string, value: unknown) {
    setSuiteProperty(key, value);
    return this;
  }

  /**
   * @description
   * @public
   * @template {string} Description
   * @param {(Descriptions | Description)} description
   * @param {() => any} specDefinitions
   * @returns {this}
   */
  public xdescribe<Description extends string>(
    description: Descriptions | Description,
    specDefinitions: () => any,
  ): this {
    this.spec.counter.reset();
    this.suite.xdescribe(
      description,
      specDefinitions,
    );
    return this;
  }
}
