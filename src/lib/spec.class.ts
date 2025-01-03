// Abstract.
import { ObjectState } from "@typescript-package/state";
import { DescriptionTemplate } from "./base";
// Type.
export type SpecType = 'fit' | 'it' | 'test' | 'xit';
// Interface.
export interface SpecOptions {
  category?: string;
  describe?: { id: number, description: string };
  log?: boolean;
  priority?: number,
  timeout?: number,
}
export interface SpecInterface<Id extends number, Expectation extends string> {
  id: Id;
  expectation: Expectation;
  assertion: jasmine.ImplementationCallback;
  category?: string;
  priority?: number;
  type: SpecType;
  timeout?: number;
  log: boolean;
  describe?: Pick<SpecOptions, 'describe'>;

  execution: boolean;
  executionTime?: number;
  passed?: boolean;
  failed?: boolean;
  result?: any;
  timestamp: Date;
}
/**
 * @description
 * @export
 * @class Spec
 * @template {number} Id
 * @template {string} Expectation
 * @extends {ObjectState<SpecInterface<Id, Expectation>>}
 */
export class Spec<Id extends number, Expectation extends string> extends ObjectState<SpecInterface<Id, Expectation>> {
  public get id(): Id {
    return super.state.id;
  }

  public get category() {
    return super.state.category;
  }

  public get execution(): boolean {
    return super.state.execution;
  }

  public get executionTime() {
    return super.state.executionTime;
  }

  public get failed() {
    return super.state.failed;
  }

  public get log() {
    return super.state.log;
  }

  public get passed() {
    return super.state.passed;
  }

  public get priority(): number | undefined {
    return super.state.priority;
  }

  public get result() {
    return super.state.result;
  }

  public get type() {
    return super.state.type;
  }

  public get timeout() {
    return super.state.timeout;
  }

  public get timestamp() {
    return super.state.timestamp;
  }

  private descriptionTemplate;

  /**
   * Creates an instance of `Spec`.
   * @constructor
   * @param {Id} id
   * @param {Expectation} expectation
   * @param {jasmine.ImplementationCallback} assertion
   * @param {boolean} [execute=true]
   * @param {('fit' | 'it' | 'test' | 'xit')} [type='it']
   * @param {{
   *       category?: string;
   *       log?: boolean;
   *       priority?: number,
   *       timeout?: number,
   *     }} [param0={}]
   */
  constructor(
    id: Id,
    expectation: Expectation,
    assertion: jasmine.ImplementationCallback,
    type: SpecType = 'it',
    execute: boolean = true,
    {}: SpecOptions = {}
  ) {
    super({
      log: false,
      ...arguments[5],
      id,
      expectation,
      assertion,
      execution: execute,
      type,
      timestamp: new Date(),
    });
    this.descriptionTemplate = new DescriptionTemplate('auto', expectation, { index: '[index]' });
    typeof execute === 'boolean' && execute === true && this.execute();
  }

  /**
   * @description
   * @public
   */
  public consoleLog(): void {
    super.state.log === true && console.log(`Spec [${this.id}] - "${super.state.expectation}" executed at ${super.state.timestamp}`);
  }

  /**
   * @description
   * @public
   * @returns {this}
   */
  public execute(): this {
    super.update({execution: true});
    switch(super.state.type) {
      case 'fit':
          this.#fit(super.state.assertion);
        break;
      case 'xit':
          this.#xit(super.state.assertion);
        break;
      default:
        this.#it(super.state.assertion);
        break;
    }    
    return this;
  }

  /**
   * @description
   * @param {jasmine.ImplementationCallback} assertion
   * @returns {this}
   */
  #fit(assertion: jasmine.ImplementationCallback): this {
    const start = Date.now();
    (execute => 
      execute === true &&
      fit(
        super.state.expectation,
        done => (
          assertion(done),
          this.consoleLog(),
          done(),
          this.update({executionTime: Date.now() - start})
        ),
        super.state.timeout
      )
    )(super.state.execution);
    return this;
  }

  /**
   * @description
   * @param {(jasmine.ImplementationCallback | (() => void | Promise<void>))} assertion
   * @returns {this}
   */
  #it(assertion: jasmine.ImplementationCallback | (() => void | Promise<void>)): this {
    const start = Date.now();
    (execute => 
      execute === true &&
      it(
        this.descriptionTemplate.replace(super.state.expectation, `[${super.state.id}] `, 'index'),
        done => (assertion(done), this.consoleLog(), done(), this.update({executionTime: Date.now() - start})),
        super.state.timeout
      )
    )(super.state.execution);
    return this;
  }

  /**
   * @description
   * @param {jasmine.ImplementationCallback} assertion
   * @returns {this}
   */
  #xit(assertion: jasmine.ImplementationCallback): this {
    (execute => 
      execute === true &&
      xit(
        super.state.expectation,
        assertion,
        super.state.timeout
      )
    )(super.state.execution);
    return this;
  }
}
