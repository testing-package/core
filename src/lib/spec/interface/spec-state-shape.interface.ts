import { SpecType } from "../type";
import { SpecOptions } from "./spec-options.interface";
/**
 * @description
 * @export
 * @interface SpecStateShape
 * @template {number} [Id=number]
 * @template {string} [Expectation=string]
 */
export interface SpecStateShape<
  Id extends number = number,
  Expectation extends string = string,
> {
  id: Id;
  expectation: Expectation;
  assertion: jasmine.ImplementationCallback;
  log: boolean;
  type: SpecType;

  describe?: Pick<SpecOptions, 'describe'>;
  category?: string;
  priority?: number;
  template? : 'auto' | 'manual' |  'off';
  timeout?: number;

  execution: boolean;
  executionTime?: number;
  passed?: boolean;
  failed?: boolean;
  result?: any;
  tag?: {[index: string]: string};
  timestamp: Date;
}
