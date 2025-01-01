// Class.
import { TestingExpectation } from '../testing-expectation.class';
// Type.
import { Constructor, InstanceOfConstructor, UnionToIntersection } from "@typescript-package/type";
import { TestingExpectations } from "../../type";
// Interface.
import { TestingConfig } from '../../interface';
/**
 * @description Combining multiple class constructors into one
 * @export
 * @template {Constructor<any>[]} Tests
 * @param {...Tests} tests
 * @returns {Constructor<any>}
 */
export function mixinTests<Tests extends Constructor<any>[]>(...tests: Tests) {
  return tests.reduce((tests, currTest, currIndex) => (
    class extends tests {
      public expectation;
      private _expectations!: any[];
      constructor(
        execute?: boolean,
        executable?: number | number[],
        index?: 'auto' | 'manual' | 'off',
        testing?: Omit<TestingConfig, 'suite'>
      ) {
        super(
          execute,
          executable,
          index,
          testing
        );

        // Call the constructor of each class to initialize properties
        const instance = new currTest(
          execute,
          executable,
          index,
          testing
        );
        Object.assign(this, instance);

        // Merge expectations
        this._expectations = [...this._expectations, ...instance.expectations];

        // Create an `TestingExpectation` instance of merged `_expectations`
        if (currIndex === tests.length - 1) {
          this.expectation = new TestingExpectation(this._expectations, testing?.expect);
        }

        // Copy methods from the current class prototype and its chain
        let currentPrototype = currTest.prototype;
        while (currentPrototype !== Object.prototype) {
          Object
            .getOwnPropertyNames(currentPrototype)
            .forEach(name => {
              // Don't copy the constructor
              if (name !== 'constructor') {
                Object.defineProperty(
                  tests.prototype,
                  name,
                  Object.getOwnPropertyDescriptor(currentPrototype, name) || Object.create(null)
                );
              }
            });

          // Move up the prototype chain
          currentPrototype = Object.getPrototypeOf(currentPrototype);
        }
      }
    }
  ), class { private _expectations: Constructor<any>[] = []; }) as Constructor<
    UnionToIntersection<InstanceOfConstructor<Tests[number]>>
    & {expectation: TestingExpectations<Tests[number]>}
  >;
  // as Constructor<UnionToIntersection<IntersectionOfInstances<T>>>;
}