import { InstanceIntersectionFromKey } from "@typescript-package/type";
/**
 * Along with ChatGPT.
 * @description
 * @export
 * @typedef {TestingExpectations}
 * @template T
 */
export type TestingExpectations<T> = InstanceIntersectionFromKey<T, 'expectations'>;

// UnionToIntersection<T extends Constructor<any>
//   ? PickInstanceFromKey<InstanceType<T>, 'expectations'>
//   : never>;