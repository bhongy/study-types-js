/* at facebook/flow aea3635e9 */

// 1) NaN is globally available
// 2) it is a type number
declare var NaN: number;
declare var Infinity: number;
// this is why passing undefined matches void
declare var undefined: void;

// 1) mixed not any
// 2) NaN is just a type number
declare function parseInt(string: mixed, radix?: number): number;
declare function parseFloat(string: mixed): number;
// isNaN coerce argument to a number first (+args[0]) then check
// if it is a NaN
declare function isNaN(number: mixed): boolean;
// isFinite is false only for Infinite, -Infinite, NaN
declare function isFinite(number: mixed): boolean;
declare function decodeURI(encodedURI: string): string;
declare function decodeURIComponent(encodedURIComponent: string): string;
declare function encodeURI(uri: string): string;
declare function encodeURIComponent(uriComponent: string): string;

interface DataDescriptor {
  configurable: boolean;
  enumerable: boolean;
  value?: any,
  writable?: boolean,
}

interface AccessorDescriptor {
  configurable: boolean;
  enumerable: boolean;
  get?(): any;
  set?(val: any): void;
}

type PropertyDescriptor = DataDescriptor | AccessorDescriptor;

declare class Object {
  // Object() or Object(undefined) -> {}
  static (o: ?void): {[key: any]: any};
  // Object(true) -> Boolean {true} (object wrapper, not literal)
  static (o: boolean): Boolean;
  static (o: number): Number;
  static (o: string): String;
  static <T: Object>(o: T): T;
  static assign: Object$Assign;
  // could these typed better (instead of any)?
  static create(o: any, properties?: any): any;
  static defineProperties(o: any, properties: any): any;
  static defineProperty(o: any, p: any, attributes: any): any;
  static entries(o: any): Array<[string, mixed]>;
  // is function overload possible in Flow?
  // static entries<T>(o: { [s: string | number]: T }): Array<[string, T]>;
  // static entries(o: any): Array<[string, mixed]>;
  static freeze<T>(o: T): T;
  // static freeze<T: {}>(o: T): $Readonly<T>;
  static getOwnPropertyDescriptor(o: any, p: any): any;
  // static getOwnPropertyDescriptor(o: any, p: string | number): PropertyDescriptor | void;
  static getOwnPropertyNames(o: any): Array<string>;
  static getOwnPropertySymbols(o: any): Array<Symbol>;
  static getPrototypeOf: Object$GetPrototypeOf;  // flow internal (ML)
  static is(a: any, b: any): boolean;
  static isExtensible(o: any): boolean;
  static isFrozen(o: any): boolean;
  static isSealed(o: any): boolean;
  static keys(o: any): Array<string>;
  static preventExtensions(o: any): any;
  static seal(o: any): any;
  static setPrototypeOf(o: any, proto: ?Object): any;
  static values(object: any): Array<mixed>;

  // it does take anything as prop key
  // return false if it's not a valid string/number
  // number key gets converted to string first so
  // both 1, '1' will result to true for { 1: 10 }
  hasOwnProperty(prop: any): boolean;
  isPrototypeOf(o: any): boolean;
  propertyIsEnumerable(prop: any): boolean;
  toLocaleString(): string;
  toString(): string;
  valueOf(): Object;

  // takes anything as key but they'll get converted to string first
  // e.g. passing any object literals and you'll always get [object Object]
  [key: any]: any;
}

// I don't understand Symbols
declare class Symbol {
  static (value?: any): Symbol;
  static for(key: string): Symbol;
  // ...
  static length: 0;
  toString(): string;
  valueOf(): ?Symbol; // why nullable?
}

declare class Function {
  apply: Function$Prototype$Apply; // (thisArg: any, argArray?: any) => any
  // should returned a new, bounded function ...
  bind: Function$Prototype$Bind; // (thisArg: any, ...argArray: Array<any>) => any;
  call: Function$Prototype$Call;
  arguments: any; // type better?
  caller: Function | null;
  length: number;
  name: string;
  // [key: any]: any;
}

declare class Boolean {
  static (value: any): boolean;
  constructor(value?: mixed): void; // Boolean object wrapper
  toString(): string;
  valueOf(): number;
}

type Number$LocaleOptions = {
    localeMatcher?: 'best fit' | 'lookup',
    style?: 'decimal' | 'currency' | 'percent',
    currency?: string,
    currencyDisplay?: 'symbol' | 'code' | 'name',
    useGrouping?: boolean,
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
};

declare class Number {
  static EPSILON: number;
  static MAX_SAFE_INTEGER: number;
  static MAX_VALUE: number;
  static MIN_SAFE_INTEGER: number;
  static MIN_VALUE: number;
  static NaN: number;
  static NEGATIVE_INFINITY: number;
  static POSITIVE_INFINITY: number;
  // cast to number - NaN for anything that cannot be converted
  // (NaN is also a number)
  // same as `+(value)` (Unary plus operator)
  static (value: any): number;
  static isFinite(value: any): boolean;
  static isInteger(value: any): boolean;
  static isNaN(value: any): boolean;
  static isSafeInteger(value: any): boolean;
  static parseFloat(value: string): number;
  static parseInt(value: string, radix?: number): number;

  constructor(value?: mixed): void; // Number object wrapper
  // to{x} methods return string representation of the number
  toExponential(fractionDigits?: number): string;
  toFixed(fractionDigits?: number): string;
  toLocaleString(
    locales?: string | Array<string>,
    options?: Number$LocaleOptions
  ): string;
  toPrecision(precision?: number): string;
  toString(radix?: number): string;
  valueOf(): number;
}

declare var Math: {
  E: number;
  LN10: number;
  LN2: number;
  LOG10E: number;
  LOG2E: number;
  PI: number;
  SQRT1_2: number;
  SQRT2: number;
  abs(x: number): number;
  acos(x: number): number;
  acosh(x: number): number;
  asin(x: number): number;
  asinh(x: number): number;
  atan(x: number): number;
  atan2(y: number, x: number): number;
  atanh(x: number): number;
  cbrt(x: number): number;
  ceil(x: number): number;
  clz32(x: number): number;
  cos(x: number): number;
  cosh(x: number): number;
  exp(x: number): number;
  expm1(x: number): number;
  floor(x: number): number;
  fround(x: number): number;
  // returns the square root of the sum of squares of its arguments
  hypot(...values: Array<number>): number;
  imul(y: number, x: number): number;
  log(x: number): number;
  log10(x: number): number;
  log1p(x: number): number;
  log2(x: number): number;
  max(...values: Array<number>): number;
  min(...values: Array<number>): number;
  pow(base: number, exponent: number): number;
  random(): number;
  round(x: number): number;
  sign(x: number): number;
  sin(x: number): number;
  sinh(x: number): number;
  sqrt(x: number): number;
  tan(x: number): number;
  tanh(x: number): number;
  // remove numbers after "." (fractional digits)
  // unlike Math.floor() which "round-down"
  // e.g. Math.floor(-12.1) -> -13
  //      Math.trunc(-12.1) -> -12
  trunc(x: number): number;
}

// why covarient (readonly) marker (+) is needed in generic
declare class $ReadOnlyArray<+T, I: number> {
  @@iterator(): Iterator<T>;
  keys(): Iterator<I>;
  values(): Iterator<T>;
  entries(): Iterator<[I, T]>;

  forEach(
    callbackfn: (value: T, index: I, array: $ReadOnlyArray<T>) => any,
    thisArg?: any
  ): void;
  map<U>( // take type T return a new type U
    callbackfn: (value: T, index: I, array: $ReadOnlyArray<T>) => U,
    thisArg?: any
  ): Array<U>;
  // a version when invoke without passing initialValue
  // just a reduce of an array of type T to just type T
  // reduce: reducer -> T[] -> T
  reduce(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: I, array: $ReadOnlyArray<T>) => T,
    initialValue: void
  ): T;
  // reduce to a new type U
  // reduce<U>: reducer<T->U> -> T[] -> U
  reduce<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: I, array: $ReadOnlyArray<T>) => U,
    initialValue: U
  ): U;
  reduceRight(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: I, array: $ReadOnlyArray<T>) => T,
    initialValue: void
  ): T;
  reduceRight<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: I, array: $ReadOnlyArray<T>) => U,
    initialValue: U
  ): U;
  // didn't know there's this version
  filter(
    callbackfn: typeof Boolean, // cast to boolean
  // assert type T not maybe (not union with null or void)
  ): Array<$NonMaybeType<T>>;
  filter(
    callbackfn: (value: T, index: I, array: $ReadOnlyArray<T>) => any,
    thisArg?: any
  ): Array<T>;
  every(
    // predicate returns any value
    // `every` uses the truthiness of the returned value
    predicate: (value: T, index: I, array: $ReadOnlyArray<T>) => any,
    thisArg?: any
  ): boolean;
  some(
    predicate: (value: T, index: I, array: $ReadOnlyArray<T>) => any,
    thisArg?: any
  ): boolean;

  find(
    callbackfn: (value: T, index: I, array: $ReadOnlyArray<T>) => any,
    thisArg?: any
  ): T | void;
  findIndex(
    // check truthiness
    callbackfn: (value: T, index: I, array: $ReadOnlyArray<T>) => any,
    thisArg?: any
  ): I;
  indexOf(searchElement: mixed, fromIndex?: I): I;
  lastIndexOf(searchElement: mixed, fromIndex?: I): I;
  includes(searchElement: mixed, fromIndex?: I): boolean;

  // I don't understand this
  // concat<S, Item: S | $ReadOnlyArray<S>>(
  //   ...items: Array<Item>, // might be nested, flatten 1 level
  // ): Array<T | S>;
  slice(start?: I, end?: I): Array<T>; // like filter by start, end indices
  join(separator?: string): string;
  toLocaleString(): string;
  +[key: I]: T; // because it's readonly array
  +length: number; // do not allow changing length or empty array
}

// declare class Array<T> extends $ReadOnlyArray<T> {
//
// }

// the Iterator/Generator interfaces are typed so well <3

type IteratorResult<+Yield, +Return> =
  | { done: false, +value: Yield }
  | { done: true, +value?: Return };

interface $Iterator<+Yield, +Return, -Next> {
  @@iterator(): $Iterator<Yield, Return, Next>;
  next(value?: Next): IteratorResult<Yield, Return>;
}
type Iterator<+T> = $Iterator<T, void, void>;

interface $Iterable<+Yield, +Return, -Next> {
  @@iterator(): $Iterator<Yield,Return,Next>;
}
type Iterable<+T> = $Iterable<T, void, void>;

interface Generator<+Yield, +Return, -Next> {
  @@iterator(): $Iterator<Yield, Return, Next>;
  next(value?: Next): IteratorResult<Yield, Return>;
  // Don't understand the union of R | Return
  return<R>(value: R): IteratorResult<Yield, R | Return>;
  throw(error?: any): IteratorResult<Yield, Return>;
}

declare function $iterate<T>(p: Iterable<T>): T;

// interface Thenable<T> {
//   then<U>(
//     onFulfilled?: (v: T) => U | Thenable<U>,
//     onRejected?: (error: any) => U | Thenable<U>, // recover
//   ): Thenable<U>;
//   then<U>(
//     onFulfilled?: (v: T) => U | Thenable<U>,
//     onRejected?: (error: any) => void,
//   ): Thenable<U>;
// }
//
// declare class Promise<+T> implements Thenable<T> {
//
// }
