// import { IntersectionOfInstances } from "../../type/intersection-of-instances.type";
import { Constructor } from "@angular-package/type";
import { InstanceOfConstructor } from "../../type/instance-of-constructor.type";
import { UnionToIntersection } from "../../type/union-to-intersection.type";

// Mixin function: combining multiple class constructors into one
export function mixin<T extends Constructor<any>[]>(...classes: T) {
  return classes.reduce((acc, currClass) => (
    class extends acc {
      constructor(...args: any[]) {
        super(...args);

        // Call the constructor of each class to initialize properties
        Object.assign(this, new currClass(...args));

        // Copy methods from the current class prototype and its chain
        let currentPrototype = currClass.prototype;
        while (currentPrototype !== Object.prototype) {
          Object
            .getOwnPropertyNames(currentPrototype)
            .forEach(name => {
              // Don't copy the constructor
              if (name !== 'constructor') {
                Object.defineProperty(
                  acc.prototype,
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
  )/*, class {}*/) as Constructor<UnionToIntersection<InstanceOfConstructor<T[number]>>>;
  // as Constructor<UnionToIntersection<IntersectionOfInstances<T>>>;
}