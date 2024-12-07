/**
 * @description
 * @export
 * @typedef {Execute}
 */
export type Execute = boolean | {
  suite?: boolean,
  spec?: boolean,
  executable?: {
    suite?: number | number[],
    spec?: number | number[]
  }
};
