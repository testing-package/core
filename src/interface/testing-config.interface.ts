// Class.
import { Expect, TestingSpec, TestingSuite } from "../lib";
//
export interface TestingConfig<
  Descriptions extends string = string,
  Expectations extends string = string,
> {
  expect?: Expect
  spec?: TestingSpec<Expectations>,
  suite?: TestingSuite<Descriptions>,
}
