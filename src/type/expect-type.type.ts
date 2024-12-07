/**
 * @description
 * @export
 * @typedef {ExpectType}
 * @template T
 */
export type ExpectType<T> = 
  T extends infer R
    ? R extends jasmine.Func
      ? R | jasmine.Spy<R>
      : R extends ArrayLike<R>
        ? ArrayLike<R>
        : R
    : T;
