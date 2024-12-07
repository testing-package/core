// Class.
import { TestingCore } from './testing-core.abstract';
import { TestingSuite } from './testing-suite.class';
import { TestingSpec } from "./testing-spec.class";
import { TextualExpectation } from './textual-expectation.abstract';
// Function.
import { mixinTests } from "./function";
// Type.
import { Constructor, InstanceTypes } from "@typescript-package/type";
import { TestingExpectations } from "../type";
// Interface.
import { TestingInterface, TestingOptions } from "../interface";
/**
 * @class
 * @classdesc
 */
export class TestingProxy<
  Tests extends Constructor<any>[] = [],
  Descriptions extends string = string,
  Expectations extends string = string,
> extends TestingCore<
  Descriptions,
  Expectations
> {
  /**
   * @description Defines the wrapper function of the `describe()` function of jasmine with the ability to decide its execution.
   * @param description "Textual description of the group"
   * @param specDefinitions "Function for Jasmine to invoke that will define"
   * @returns The returned value is a `function` that contains the `describe()` function of jasmine with the ability to decide its execution.
   */
  public static defineDescribe(
    description: string,
    specDefinitions: () => void
  ): (execute: boolean) => void {
    return TestingSuite.define(description, specDefinitions);
  }

  /**
   * @description Defines the wrapper function of the `it()` function of jasmine with the ability to decide its execution.
   * @param expectation "Textual description of what this spec is checking"
   * @param assertion "Function that contains the code of your test. If not provided the test will be pending."
   * @param timeout "Custom timeout for an async spec."
   * @returns The return value is a `function` that contains the `it()` function of jasmine with the ability to decide its execution.
   */
  public static defineIt(
    expectation: string,
    assertion: jasmine.ImplementationCallback,
    timeout?: number | undefined
  ): (execute: boolean) => void {
    return TestingSpec.define(expectation, assertion, timeout);
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {*}
   */
  public get tests() {
    return this._tests;
  }

  /**
   * @description
   * @protected
   * @type {*}
   */
  protected _tests;

  /**
   * Creates an instance of `TestingProxy`.
   * @constructor
   * @param {[...Tests]} tests
   * @param {?(boolean | { suite?: boolean, spec?: boolean })} [execute]
   * @param {TestingOptions<Descriptions, Expectations>} [param0={}]
   */
  constructor(
    tests: [...Tests],
    execute?: boolean | { suite?: boolean, spec?: boolean },
    {}: TestingOptions<Descriptions, Expectations> = {}
  ) {
    super(execute, arguments[2]);

    // Tests.
    this._tests = new (mixinTests<Tests>(...tests))(
      this._testingSpec.allowed,
      this._testingSpec.executable,
      this.number,
      {expect: this.expect, spec: this.spec},
    );

    //#region Proxy.
    // Proxy to delegate method calls to _testing
    return new Proxy(this as this & InstanceTypes<Tests>, {
      get(target: TestingProxy<Tests, Descriptions, Expectations> & InstanceTypes<Tests>, prop: PropertyKey) {
        return prop in target ? (target as any)[prop] : (target as any)._tests[prop];
      },
    }) as this & TestingProxy<Tests, Descriptions, Expectations> & InstanceTypes<Tests>;
    //#endregion
  }

  /**
   * @description
   * @param assertion 
   * @param description 
   * @param execute 
   * @returns 
   */
  public dit(
    assertion: (
      // TestingExpectationType // UnionToIntersection<ExpectMethods<T[number]>> // GetExpectationsArray<InstanceType<T[number]>>
      expectation: TestingExpectations<Tests[number]>) => any, 
    description: string = '',
    execute?: boolean,
  ): this {
    if (description.length === 0) {
      Object
        .entries(TextualExpectation.message)
        .forEach(([name, message]) => assertion
          .toString()
          .includes(name) && (description += message.ok + " and ")
        );
      description = description.slice(0, -5);
    }
    super.spec.it(
      description,
      () => assertion(this._tests.expectation),
      execute
    );
    return this;
  }
}

export const Testing = TestingProxy as TestingInterface;
