// Abstract.
import { ObjectState } from "@typescript-package/state";
import { Spec } from "./spec.class";
import { Counter, DescriptionTemplate } from "./base";

// Type.
export type SuiteType = 'describe' | 'fdescribe' | 'xdescribe';


export interface SuiteOptions {
  category?: string;
  index? : 'auto' | 'manual' |  'off'
  log?: boolean;
  priority?: number,
  timeout?: number,
}
export interface SuiteInterface<Id extends number, Description extends string> {
  id: Id;
  description: Description;
  specDefinitions: () => void;
  category?: string;
  index? : 'auto' | 'manual' |  'off';
  priority?: number;
  type: SuiteType;
  timeout?: number;
  log: boolean;

  execution: boolean;
  executionTime?: number;
  passed?: boolean;
  failed?: boolean;
  result?: any;
  timestamp: Date;
}

export class Suite<Id extends number, Description extends string> extends ObjectState<SuiteInterface<Id, Description>> {
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

  private counter;
  private descriptionTemplate;

  constructor(
    id: Id,
    description: Description,
    specDefinitions: (() => void) | ({ [index: string]: () => void }),
    execute: boolean = true,
    type: SuiteType = 'describe',
    {}: SuiteOptions = {}
  ) {
    super({
      log: false,
      ...arguments[5],
      id,
      description,
      specDefinitions,
      execution: execute,
      type,
      timestamp: new Date(),
    });
    this.counter = new Counter();
    this.descriptionTemplate = new DescriptionTemplate(super.state.index, description, {index: '[index]'});
    typeof execute === 'boolean' && execute === true && this.execute();
  }

  /**
   * @description
   * @public
   */
  public consoleLog(): void {
    super.state.log === true && console.log(`Suite [${this.id}] - "${super.state.description}" executed at ${super.state.timestamp}`);
  }

  /**
   * @description
   * @public
   * @returns {this}
   */
  public execute(): this {
    switch(super.state.type) {
      case 'fdescribe':
          this.#fdescribe(super.state.specDefinitions);
        break;
      case 'xdescribe':
          this.#xdescribe(super.state.specDefinitions);
        break;
      default:
        this.#describe(
          typeof super.state.specDefinitions === 'function'
          ? super.state.specDefinitions
          : () => 
            Object.entries(super.state.specDefinitions)
              .forEach(([description, spec]) => (this.counter.increment(), new Spec(this.counter.current, description, spec)))
        );
        break;
    }    
    return this;
  }

  #describe(specDefinitions: () => void): this {
    (execute => 
      execute === true &&
      describe(
        this.descriptionTemplate.replace(super.state.description, `[${super.state.id}] `, 'index'),
        () => (specDefinitions(), this.consoleLog()),
      )
    )(super.state.execution);
    return this;
  }

  #fdescribe(specDefinitions: () => void): this {
    (execute => 
      execute === true &&
      fdescribe(
        this.descriptionTemplate.replace(super.state.description, `[${super.state.id}] `, 'index'),
        () => (specDefinitions(), this.consoleLog()),
      )
    )(super.state.execution);
    return this;
  }

  #xdescribe(specDefinitions: () => void): this {
    (execute => 
      execute === true &&
      xdescribe(
        super.state.description,
        () => (specDefinitions(), this.consoleLog()),
      )
    )(super.state.execution);
    return this;
  }
}
