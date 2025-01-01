// Interface.
import { TestingConfig } from "./testing-config.interface"
/**
 * @description
 * @export
 * @interface TestingOptions
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
  index?: 'auto' | 'manual' |  'off',
  testing?: TestingConfig<Descriptions, Expectations>
}
