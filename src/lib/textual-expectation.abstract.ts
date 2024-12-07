// Type.
import { ExpectType } from "../type";
/**
 * @description
 * @export
 * @abstract
 * @class TextualExpectation
 * @typedef {TextualExpectation}
 */
export abstract class TextualExpectation {
  /**
   * @description
   * @param method 
   * @param not 
   * @returns 
   */
  public static getFail(
    method: keyof typeof TextualExpectation.message,
    not: boolean,
  ) {
    return `${this.expectationFailOutput} ${not === true ? `not` : ``}${TextualExpectation.message[method].fail}`;
  }

  public static get<T>(
    method: keyof typeof TextualExpectation.message,
    actual?: ExpectType<T>,
    expected?: any
  ) {
    return TextualExpectation.message[method].ok;
  }

  // Method to update expectations
  public static updateExpectation(
    key: keyof Omit<typeof TextualExpectation, "getExpectationFailOutput" | "prototype" | "updateExpectation">,
    newValue: string
  ): void {
    (this as any)[key] = newValue;
  }

  /**
   * 
   */
  public static message = {
    toBe: { ok: "The `actual` value to be `===` to the `expected` value.", fail: "be the `expected` value" },
  
    // toBeArray
    toBeArray: { ok: "The `actual` value must be `array` type or an instance of `Array`.", fail: "be an `array`" },
    toBeArrayOf: { ok: "The `actual` value must be `array` type or an instance of `Array` of `expected`.", fail: "be an `array` of `expected`" },

    //#region toBeArrayOf
    toBeArrayOfBigInt: { ok: "The `actual` value must be `array` type or an instance of `Array` of `bigint`.", fail: "be an `array` of `bigint`" },
    toBeArrayOfBoolean: { ok: "The `actual` value must be `array` type or an instance of `Array` of `boolean`.", fail: "be an `array` of `boolean`" },
    toBeArrayOfDate: { ok: "The `actual` value must be `array` type or an instance of `Array` of `date`.", fail: "be an `array` of `date`" },
    toBeArrayOfDefined: { ok: "The `actual` value must be `array` type or an instance of `Array` of defined.", fail: "be an `array` of defined" },
    toBeArrayOfFalse: { ok: "The `actual` value must be `array` type or an instance of `Array` of `false`.", fail: "be an `array` of `false`" },
    toBeArrayOfNull: { ok: "The `actual` value must be `array` type or an instance of `Array` of `null`.",  fail: "be an `array` of `null`"},
    toBeArrayOfNumber: { ok: "The `actual` value must be `array` type or an instance of `Array` of `number`.", fail: "be an `array` of `number`" },
    toBeArrayOfRegExp: { ok: "The `actual` value must be `array` type or an instance of `Array` of `regexp`.", fail: "be an `array` of `regexp`" },
    toBeArrayOfString: { ok: "The `actual` value must be `array` type or an instance of `Array` of `string`.", fail: "be an `array` of `string`" },
    toBeArrayOfSymbol: { ok: "The `actual` value must be `array` type or an instance of `Array` of `symbol`.", fail: "be an `array` of `symbol`" },
    toBeArrayOfTrue: { ok: "The `actual` value must be `array` type or an instance of `Array` of `true`.", fail: "be an `array` of `true`" },
    toBeArrayOfUndefined: { ok: "The `actual` value must be `array` type or an instance of `Array` of `undefined`.", fail: "be an `array` of `undefined`" },    
    
    //#region Single value types
    toBeBigInt: { ok: "The `actual` value must be a `bigint` type.", fail: "be a `bigint`" },
    toBeBoolean: { ok: "The `actual` value must be of a `boolean` type or an instance of `Boolean`.", fail: "" },
    toBeBooleanType: { ok: "The `actual` value must be of a `boolean` type.", fail: "" },

    //
    toBeClass: { ok: "The 'actual' value must be a 'class'.", fail: "" },
    toBeCloseTo: { ok: "The 'actual' value must be within a specified 'precision' of the 'expected' actual.", fail: "" },
    toBeDate: { ok: "The 'actual' value to be a 'date'.", fail: "" },
    toBeDefined: { ok: "The 'actual' value must be defined.", fail: "" },
      
    // false
    toBeFalse: { ok: "The `actual` value must be `false`.", fail: "" },
    toBeFalsy: { ok: "The `actual` value must be falsy.", fail: "" },

    // Type checks
    toBeFunction: { ok: "The `actual` value must be `function`.", fail: "" },

    // Comparison: GreaterThan
    toBeGreaterThan: { ok: "The `actual` value to be greater than the `expected` value.", fail: "" },
    toBeGreaterThanOrEqual: { ok: "The `actual` value to be greater than or equal to the `expected` value.", fail: "" },

    //#region Instance checks
    toBeInstance: { ok: "The 'actual' value to be an instance of 'constructor'.", fail: "be an instance of `constructor`" },
    toBeInstanceOf: { ok: "The `actual` value must be an instance of `expected`.", fail: "be an instance of `expected`" },
    toBeInstanceOfArray: { ok: "The `actual` value must be an instance of an `Array`.", fail: "be an instance of `Array`" },
    toBeInstanceOfBoolean: { ok: "The `actual` value must be an instance of `Boolean`.", fail: "be an instance of `Boolean`" },
    toBeInstanceOfDate: { ok: "The `actual` value must be an instance of `DataView`.", fail: "be an instance of `DataView`" },
    toBeInstanceOfDataView: { ok: "The `actual` value must be an instance of `Date`.", fail: "be an instance of `Date`" },
    toBeInstanceOfError: { ok: "The `actual` value must be an instance of an `Error`.", fail: "be an instance of `Error`." },
    toBeInstanceOfEvalError: { ok: "The `actual` value must be an instance of an `EvalError`.", fail: "be an instance of `EvalError`" },
    toBeInstanceOfFunction: { ok: "The `actual` value must be an instance of a `Function`.", fail: "be an instance of `Function`" },
    toBeInstanceOfMap: { ok: "The `actual` value must be an instance of a `Map`.", fail: "be an instance of `Map`" },
    toBeInstanceOfNumber: { ok: "The `actual` value must be an instance of a `Number`.", fail: "be an instance of `Number`" },
    toBeInstanceOfObject: { ok: "The `actual` value must be an instance of an `Object`.", fail: "be an instance of `Object`" },
    toBeInstanceOfPromise: { ok: "The `actual` value must be an instance of `Promise`.", fail: "be an instance of `Promise`" },
    toBeInstanceOfRangeError: { ok: "The 'actual' value must be an instance of 'RangeError'.", fail: "be an instance of `RangeError`" },
    toBeInstanceOfReferenceError: { ok: "The 'actual' value must be an instance of 'ReferenceError'.", fail: "be an instance of `ReferenceError`" },
    toBeInstanceOfRegExp: { ok: "The 'actual' value must be an instance of 'RegExp'.", fail: "be an instance of `RegExp`" },
    toBeInstanceOfSet: { ok: "The 'actual' value must be an instance of 'Set'.", fail: "be an instance of `Set`" },
    toBeInstanceOfString: { ok: "The 'actual' value must be an instance of a 'String'.", fail: "be an instance of `String`" },
    toBeInstanceOfSyntaxError: { ok: "The 'actual' value must be an instance of 'SyntaxError'.", fail: "be an instance of `SyntaxError`" },
    toBeInstanceOfTypeError: { ok: "The 'actual' value must be an instance of 'TypeError'.", fail: "be an instance of `TypeError`" },
    toBeInstanceOfURIError: { ok: "The 'actual' value must be an instance of 'URIError'.", fail: "be an instance of `URIError`" },
    toBeInstanceOfWeakMap: { ok: "The 'actual' value must be an instance of a 'WeakMap'.", fail: "be an instance of `WeakMap`" },
    toBeInstanceOfWeakSet: { ok: "The 'actual' value must be an instance of a 'WeakSet'.", fail: "be an instance of `WeakSet`" },

    //
    toBeKey: { ok: "The 'actual' value to be a 'PropertyKey'.", fail: "" },
  
    //#region Comparison: LessThan
    toBeLessThan: { ok: "The `actual` value to be less than the `expected` value.", fail: "" },
    toBeLessThanOrEqual: { ok: "The `actual` value to be less than or equal to the `expected` value.", fail: "" },

    toBeNaN: { ok: "The 'actual' value to be NaN (Not a Number).", fail: "" },
    toBeNegativeInfinity: { ok: "The 'actual' value to be -Infinity (-infinity).", fail: "" },
    toBeNull: { ok: "The 'actual' value must be 'null'.", fail: "" },
    toBeNumber: { ok: "The 'actual' value to be a 'number' type or an instance of 'Number'.", fail: "" },
    toBeNumberBetween: { ok: "The 'actual' value to be a 'number' type or an instance of 'Number' between the range of 'min' and 'max'.", fail: "" },
    toBeNumberType: { ok: "The 'actual' value must be of a 'number' type.", fail: "" },

    //#region object
    toBeObject: { ok: "The `actual` value must be of `object` type or an instance of `Object`.", fail: "" },
    toBeObjectKey: { ok: "The 'actual' value must be of 'object' type or an instance of 'Object' with a given 'key'.", fail: "" },
    toBeObjectKeys: { ok: "The 'actual' value must be of 'object' type or an instance of 'Object' with given 'keys'.", fail: "" },
    toBeObjectKeyIn: { ok: "The 'actual' value must be of 'object' type or an instance of 'Object' with a given 'key' in it (or its prototype chain).", fail: "" },
    toBeObjectKeysIn: { ok: "The 'actual' value must be of 'object' type or an instance of 'Object' with given 'keys' in it (or its prototype chain).", fail: "" },
    toBeObjectSomeKeys: { ok: "The 'actual' value must be of 'object' type or an instance of 'Object' with some given 'keys'.", fail: "" },
    toBePending: { ok: "Mark a spec as pending, expectation results will be ignored.", fail: "" },
    toBePositiveInfinity: { ok: "The 'actual' value to be Infinity (infinity).", fail: "" },    
    toBeRegExp: { ok: `The 'actual' value must be ${RegExp.name}.`, fail: "" },
    
    //#region Async
    //#region Rejected
    toBeRejected: { ok: "Expect the `actual` value a promise to be rejected.", fail: "" },
    toBeRejectedWith: { ok: "Expect the 'actual' value a promise to be rejected with a value equal to the expected, using deep equality comparison.", fail: "" },
    toBeRejectedWithError: { ok: "Expect the 'actual' value a promise to be rejected with a value matched to the expected.", fail: "" },  
    //#region Resolved
    toBeResolved: { ok: "Expect the `actual` value a promise to be resolved.", fail: "" },
    toBeResolvedTo: { ok: "Expect the 'actual' value a promise to be resolved to a value equal to the expected, using deep equality comparison.", fail: "" },

    //#region String
    toBeString: { ok: "The `actual` value must be a `string` type or an instance of a `String`.", fail: "" },
    toBeStringIncludes: { ok: "The 'actual' value must be a 'string' type or an instance of a 'String' that includes the specified words/sentences.", fail: "" },
    toBeStringIncludesSome: { ok: "The 'actual' value must be a 'string' type or an instance of a 'String' that includes some of the specified words/sentences.", fail: "" },
    toBeStringOfLength: { ok: "The 'actual' value must be a 'string' type or an instance of a 'String' of the given 'length'.", fail: "" },
    toBeStringOfLengthBetween: { ok: "The 'actual' value must be a 'string' type or an instance of a 'String' of the length between the given 'min' and 'max'.", fail: "" },
    toBeStringType: { ok: "The 'actual' value must be of a 'string' type.", fail: "" },

    //#region Symbol
    toBeSymbol: { ok: "The 'actual' value must be a 'symbol'.", fail: "" },
    
    //#region Truthiness
    toBeTrue: { ok: "The `actual` value must be a `boolean` type or an instance of `Boolean` equal to `true`.", fail: "" },
    toBeTruthy: { ok: "The `actual` value to be truthy.", fail: "" },

    toBeTypeOf: { ok: "The `actual` value to be type of `expected`.", fail: "" },
    toBeUndefined: { ok: "The 'actual' value must be 'undefined'.", fail: "" },
  
    //#region Matching
    toContain: { ok: "The `actual` value to contain a specific value.", fail: "" },
    toEqual: { ok: "The `actual` value to be equal to the `expected`; using deep equality comparison.", fail: "" },

    //#region toHaveBeen
    toHaveBeenCalled: { ok: "The 'actual' value (a Spy) to have been called.", fail: "" },
    toHaveBeenCalledBefore: { ok: "The 'actual' value (a Spy) to have been called before another Spy.", fail: "" },
    toHaveBeenCalledOnceWith: { ok: "The 'actual' value (a Spy) to have been called exactly once, and exactly with the particular arguments.", fail: "" },
    toHaveBeenCalledTimes: { ok: "The 'actual' value (a Spy) to have been called the specified number of times.", fail: "" },
    toHaveBeenCalledWith: { ok: "The 'actual' (a Spy) to have been called with particular arguments at least once.", fail: "" },

    //#region toHave
    toHaveClass: { ok: "The 'actual' value to be a DOM element that has the expected class.", fail: "" },
    toHaveSize: { ok: "The 'actual' size to be equal to the expected, using array-like length or object keys size.", fail: "" },
    toHaveSpyInteractions: { ok: "The 'actual' value (a SpyObj) spies to have been called.", fail: "" },
  
    //#region Matching
    toMatch: { ok: "The `actual` value to match a regular expression.", fail: "" },
  
    //#region Errors
    toThrow: { ok: "The `actual` value a function to throw something.", fail: "" },
    toThrowError: { ok: "The `actual` value a function to throw an Error.", fail: "" },
    toThrowMatching: { ok: "The `actual` value a function to throw something matching a predicate.", fail: "" },
  };

  /**
   * @description The Default message for the expectation fails.
   */
  public static expectationFailOutput = `The expected value should`;
}
