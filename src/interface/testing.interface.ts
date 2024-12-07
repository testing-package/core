// Class.
import { TestingProxy } from '../lib/testing.class';
// Type.
import { Constructor, InstanceTypes } from '@typescript-package/type';
// Interface.
import { TestingConfig } from './testing-config.interface';
/**
 * @description
 * @export
 * @interface TestingInterface
 * @typedef {TestingInterface}
 * @extends {Omit<typeof TestingProxy, "prototype">}
 */
export interface TestingInterface extends Omit<typeof TestingProxy, "prototype"> {
  new <
    Tests extends Constructor<any>[],
    Descriptions extends string = string,
    Expectations extends string = string,
  >(
    tests: [...Tests],

    /**
     * @description Execute testing or suites/specs.
     * @type {?(boolean | { suite?: boolean, spec?: boolean })}
     */
    execute?: boolean | {      
      /**
       * @description
       * @type {?boolean}
       */
      suite?: boolean,

      /**
       * @description
       * @type {?boolean}
       */
      spec?: boolean
    },

    {}?: {
      /**
       * @description Numbers of suites and/or specs to execute.
       * @type {?{
       *         suite?: number | number[],
       *         spec?: number | number[]
       *       }}
       */
      executable?: {
        suite?: number | number[],
        spec?: number | number[]
      },

      /**
       * @description Suites textual descriptions.
       * @type {?(Descriptions | Descriptions[])}
       */
      descriptions?: Descriptions | Descriptions[],

      /**
       * @description Specs textual expectations.
       * @type {?(Expectations | Expectations[])}
       */
      expectations?: Expectations | Expectations[],  
        
      /**
       * @description Whether to add number in description of suites and specs.
       * @type {?('auto' | 'manual' |  'off')}
       */
      number?: 'auto' | 'manual' |  'off',

      /**
       * @description Testing instances.
       * @type {?TestingConfig<Descriptions, Expectations>}
       */
      testing?: TestingConfig<Descriptions, Expectations>
    }
  ): TestingProxy<Tests, Descriptions, Expectations> & InstanceTypes<Tests>;
}
