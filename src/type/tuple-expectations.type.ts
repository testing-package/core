// Type.
import { Constructor, InstanceTupleFromKey } from "@typescript-package/type";
/**
 * @description
 * @export
 * @typedef {TupleExpectations}
 * @template {readonly Constructor<any>[]} T
 */
export type TupleExpectations<T extends readonly Constructor<any>[]> = InstanceTupleFromKey<T, 'expectations'>;

// Readonly<UnionToTuple<
//   {
//     [K in keyof T]: T[K] extends Constructor<any>
//       ? PickInstanceFromKey<InstanceType<T[K]>, 'expectations'>
//       : never;
//   }[number]
// >>;
