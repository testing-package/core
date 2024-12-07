// Class.
import { Expect } from '../lib';
import { TestingExpectationProxy } from '../lib/testing-expectation.class';
// Type.
import { Constructor, InstanceTypes } from '@typescript-package/type';
/**
 * @description
 * @export
 * @interface TestingExpectationInterface
 * @typedef {TestingExpectationInterface}
 * @extends {Omit<typeof TestingExpectationProxy, "prototype">}
 */
export interface TestingExpectationInterface extends Omit<typeof TestingExpectationProxy, "prototype"> {
  new <T extends readonly Constructor<any>[]>(
    expectation: readonly [...T],
    expect?: Expect
  ): TestingExpectationProxy<T> & InstanceTypes<T>;
}
