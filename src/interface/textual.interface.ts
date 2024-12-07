export interface Textual<
  Descriptions extends string = string,
  Expectations extends string = string,
> {
  descriptions?: Descriptions | Descriptions[],
  expectations?: Expectations | Expectations[],  
}