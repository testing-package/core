// Abstract.
import { State } from '@typescript-package/state';
/**
 * Creates an instance of `DescriptionTemplate`.
 * @class
 * @classdesc Description with a specific template replacement.
 */
export class DescriptionTemplate<
  Descriptions extends string = string,
  Template extends {[index: string]: string} = {}
> {
  /**
   * @description
   * @public
   * @readonly
   * @type {Descriptions | Descriptions[]}
   */
  public get descriptions() {
    return this.#descriptions;
  }

  /**
   * @description Description template mode.
   * @public
   * @readonly
   * @type {('auto' | 'manual' | 'off')}
   */
  public get mode(): 'auto' | 'manual' | 'off' {
    return this.#mode.state;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Template}
   */
  public get template(): Template {
    return this.#template;
  }
  
  /**
   * @description
   * @type {Descriptions | Descriptions[]}
   */
  #descriptions;

  /**
   * @description Description template mode.
   * @public
   * @readonly
   * @type {TemplateMode}
   */
  #mode;

  /**
   * @private
   */
  #template: Template = {} as Template;
  
  /**
   * Creates an instance of child `class`.
   * @constructor
   * @param {?('auto' | 'manual' | 'off')} [mode='off']
   * @param {?(Descriptions | Descriptions[])} [descriptions]
   * @param {?typeof DescriptionTemplate.template} [template]
   */
  constructor(
    mode: 'auto' | 'manual' | 'off' = 'off',
    descriptions?: Descriptions | Descriptions[],
    template?: Template
  ) {
    this.#mode = new class TemplateMode extends State<typeof mode> {}(mode).freeze();
    this.#descriptions = descriptions;
    typeof template === 'object' && (this.#template = template);
  }

  /**
   * @description Replaces `DescriptionTemplate.template` in `description`.
   * @public
   * @template {string} Description
   * @param {(Descriptions | Description)} description - A `Description` type value.
   * @param {string} replacement
   * @param {keyof Template} replaceTemplateName
   * @returns {string} The returned value is a `string` type `description`.
   */
  public replace<Description extends string>(
    description: Descriptions | Description,
    replacement: string,
    replaceTemplateName: keyof Template,
  ): string {
    return this.#mode.state !== 'off'
    ? this.join(description, replaceTemplateName).replace(
        this.template[replaceTemplateName],
        `${replacement}`
      )
    : description;
  }

  /**
   * @description
   * @protected
   * @template {string} Description
   * @param {Description} description
   * @param {keyof Template} templateName
   * @returns {string}
   */
  protected join<Description extends string>(
    description: Description,
    templateName: keyof Template,
  ): string {
    return this.#mode.state === 'auto'
      ? `${this.template[templateName]}${description}`
      : description;
  }
}
