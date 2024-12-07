// Class.
import { Expect } from './base/expect.class';
import { TestingExpect } from './testing-expect.abstract';
// Function.
import { mixin } from './function';
// Type.
import { Constructor, InstanceTypes } from '@typescript-package/type';
// Interface.
import { TestingExpectationInterface } from '../interface';
/**
 * Creates an instance of `TestingExpectationProxy`.
 * @class
 * @classdesc Testing expectation.
 */
export class TestingExpectationProxy<
  T extends readonly Constructor<any>[],
> extends TestingExpect {
  private _expectation;
  private _proxy;

  /**
   * @description
   * @param expect 
   */
  constructor(
    expectation: readonly [...T],
    expect: Expect = new Expect()
  ) {
    super(expect);

    // Tests.
    this._expectation = new (mixin(...expectation))(expect) as InstanceTypes<T>;

    // Proxy to delegate method calls to _expectation
    this._proxy = new Proxy(this as this & InstanceTypes<T>, {
      get(target: TestingExpectationProxy<T> & InstanceTypes<T>, prop: PropertyKey) {
        // Check the prototype tree.
        let descriptor: PropertyDescriptor | undefined;
        let proto = Object.getPrototypeOf(target);
        while (proto && !descriptor) {
          descriptor = Object.getOwnPropertyDescriptor(proto, prop);
          proto = Object.getPrototypeOf(proto);
        }

        if (descriptor?.get) {
          const value = descriptor.get.call(target);
          // If the getter returns the original instance, return the proxy instead
          return value === target ? target._proxy : value;
        }

        const method = (target as any)[prop];
        
        // Handle methods
        if (typeof method === 'function') {
          return (...args: any[]) => {
            const value = method.apply(target, args);
            // If the method returns the original instance, return the proxy instead
            return value === target ? target._proxy : value;
          };
        }

        return prop in target ? (target as any)[prop] : (target as any)._expectation[prop];
      },
    }) as this & TestingExpectationProxy<T> & InstanceTypes<T>;
    return this._proxy;
  }
}

export const TestingExpectation = TestingExpectationProxy as TestingExpectationInterface;
