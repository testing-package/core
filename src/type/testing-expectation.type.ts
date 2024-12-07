// Class.
import { TestingExpectationProxy } from "../lib/testing-expectation.class";
// Type.
import { Constructor, InstanceTypes } from "@typescript-package/type";
/**
 * @description
 * @export
 * @typedef {TestingExpectationType}
 * @template {readonly Constructor<any>[]} T
 */
export type TestingExpectationType<T extends readonly Constructor<any>[]> = TestingExpectationProxy<T> & InstanceTypes<T>;