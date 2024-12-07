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
   * @description Status of automatically joining specific template to the description.
   * @public
   * @readonly
   * @type {('auto' | 'manual' | 'off')}
   */
  public get active(): 'auto' | 'manual' | 'off' {
    return this.#active;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Descriptions | Descriptions[]}
   */
  public get get() {
    return this.#descriptions;
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
   * @type {('auto' | 'manual' | 'off')}
   */
  #active: 'auto' | 'manual' | 'off' = 'manual';
  
  /**
   * @description
   * @type {Descriptions | Descriptions[]}
   */
  #descriptions;

  /**
   * @private
   */
  #template: Template = {} as Template;
  
  /**
   * Creates an instance of `DescriptionTemplate`.
   * @constructor
   * @param {?('auto' | 'manual' | 'off')} [active]
   * @param {?(Descriptions | Descriptions[])} [descriptions]
   * @param {?typeof DescriptionTemplate.template} [template]
   */
  constructor(
    active?: 'auto' | 'manual' | 'off',
    descriptions?: Descriptions | Descriptions[],
    template?: Template
  ) {
    typeof active === 'string' && (this.#active = active);
    this.#descriptions = descriptions;
    typeof template === 'object' && (this.#template = template);
  }

  /**
   * @description Replaces `DescriptionTemplate.template` in `description`.
   * @public
   * @param {string} description - A `string` type value.
   * @param {string} replacement
   * @param {keyof Template} replaceTemplateName
   * @returns {string} The returned value is a `string` type `description`.
   */
  public replace(
    description: string,
    replacement: string,
    replaceTemplateName: keyof Template,
  ): string {
    return this.#active !== 'off'
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
    return this.#active === 'auto'
      ? `${this.template[templateName]}. ${description}`
      : description;
  }
}
