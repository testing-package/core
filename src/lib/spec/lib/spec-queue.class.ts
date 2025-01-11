
import { Spec } from "./spec.class";
import { ProcessingQueue } from '@typescript-package/queue';
/**
 * @description
 * @export
 * @class SpecQueue
 * @template {number} Ids 
 * @template {string} Expectations 
 * @extends {ProcessingQueue<Spec<Ids, Expectations>>}
 */
export class SpecQueue<
  Ids extends number,
  Expectations extends string
> extends ProcessingQueue<Spec<Ids, Expectations>> {
  public override enqueue(spec: Spec<Ids, Expectations>): this {
    super.enqueue(spec);
    this.run(spec => spec.update({execution: true}).execute());
    return this;
  }
}
