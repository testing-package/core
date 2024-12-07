// export interface TestingOptions {
//   not?: boolean,
//   expectation?: string,
//   expectationFailOutput?: any,
//   execute?: boolean,
// }
// Interface.
import { TestingConfig } from "./testing-config.interface"
/**
 * @description
 * @export
 * @interface TestingOptions
 * @typedef {TestingOptions}
 * @template {string} [Descriptions=string]
 * @template {string} [Expectations=string]
 */
export interface TestingOptions<
  Descriptions extends string = string,
  Expectations extends string = string,
> {
  executable?: {
    suite?: number | number[],
    spec?: number | number[]
  },
  descriptions?: Descriptions | Descriptions[],
  expectations?: Expectations | Expectations[],  
  number?: 'auto' | 'manual' |  'off',
  testing?: TestingConfig<Descriptions, Expectations>
}
