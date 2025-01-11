// Abstract.
import { ObjectState as SpecState } from "@typescript-package/state";
// Class.
import { DescriptionTemplate } from "../../base";
// Interface.
import { SpecOptions, SpecStateShape } from "../interface";
// Type.
import { SpecType } from "../type";
/**
 * @description
 * @export
 * @class Spec
 * @template {number} [Id=number]
 * @template {string} [Expectation=string]
 * @extends {SpecState<SpecStateShape<Id, Expectation>>}
 */
export class Spec<
  Id extends number = number,
  Expectation extends string = string,
> extends SpecState<SpecStateShape<Id, Expectation>> {
  /**
   * @description
   * @public
   * @static
   * @type {{ category: string; index: string; }}
   */
  public static tag = {
    category: '[category]',
    index: '[index]',
  };

  /**
   * @description
   * @public
   * @readonly
   * @type {Id}
   */
  public get id(): Id {
    return super.state.id;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {(string | undefined)}
   */
  public get category(): string | undefined {
    return super.state.category;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {boolean}
   */
  public get execution(): boolean {
    return super.state.execution;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {string}
   */
  public get expectation(): string {
    return super.state.expectation;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {(number | undefined)}
   */
  public get executionTime(): number | undefined {
    return super.state.executionTime;
  }

  public get failed(): boolean | undefined {
    return super.state.failed;
  }

  public get log(): boolean {
    return super.state.log;
  }

  public get passed(): boolean | undefined {
    return super.state.passed;
  }

  public get priority(): number | undefined {
    return super.state.priority;
  }

  public get result(): any {
    return super.state.result;
  }

  public get type(): SpecType {
    return super.state.type;
  }

  public get timeout(): number | undefined {
    return super.state.timeout;
  }

  public get timestamp(): Date {
    return super.state.timestamp;
  }

  /**
   * @description
   * @readonly
   * @type {*}
   */
  get #expectation() {
    return this.descriptionTemplate.replaceMultiple(
      super.state.expectation,
      {
        index: `${super.state.id}. `,
        category: `${super.state.category}: `
      }
    );
  }

  private start: number = 0;
  private descriptionTemplate;

  constructor(
    id: Id,
    expectation: Expectation,
    assertion: jasmine.ImplementationCallback,
    type: SpecType = 'it',
    execute: boolean = false,
    {}: SpecOptions = {}
  ) {
    super({
      log: false,
      ...{ tag: Spec.tag },
      ...arguments[5],
      id,
      expectation,
      assertion: (done: DoneFn) => {
        const promise = assertion(done);
        this.consoleLog();
        this.update({executionTime: Date.now() - this.start});
        done();
        return promise;
      },
      execution: true,
      type,
      timestamp: new Date(),
    });
    this.descriptionTemplate = new DescriptionTemplate(super.state.template, expectation, super.state.tag);
    typeof execute === 'boolean' && execute === true && this.execute();
  }

  public asyncExecute<Type = boolean>(resolved?: (value: Type) => void, rejected?: (value: Type) => void) {
    this.start = Date.now();
    const previousAssertion = super.state.assertion;
    this.update({
      assertion: done => {
        new Promise<Type>((resolve, reject) => {
          try {
            const promise = previousAssertion((() => {}) as DoneFn);
            promise
            ? promise.then(value => resolve(value), value => reject(value))
            : resolve(true as Type);
          } catch(error) {
            reject(false);
          }
        })
        .then(value => (resolved?.(value), done(), value))
        .catch(value => (rejected?.(value), done(), value));
      }
    }).execute();
  }

  public execute(): this {
    switch(super.state.type) {
      case 'fit': this.#fit(super.state.assertion); break;
      case 'xit': this.#xit(super.state.assertion); break;
      default: this.#it(super.state.assertion); break;
    }
    return this;
  }

  /**
   * @description
   * @protected
   */
  protected consoleLog(): void {
    super.state.log === true && console.log(`Spec [${this.id}] - "${super.state.expectation}" executed at ${super.state.timestamp}`);
  }

  /**
   * @description
   * @param {jasmine.ImplementationCallback} assertion
   * @returns {this}
   */
  #fit(assertion: jasmine.ImplementationCallback): this {
    this.start = Date.now();
    (execute => 
      execute === true &&
      fit(
        this.#expectation,
        done => assertion(done),
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
  #it(assertion: jasmine.ImplementationCallback): this {
    const start = Date.now();
    (execute => 
      execute === true &&
      it(
        this.#expectation,
        done => assertion(done),
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
        this.#expectation,
        assertion,
        super.state.timeout
      )
    )(super.state.execution);
    return this;
  }
}
