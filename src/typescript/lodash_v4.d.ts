// Type definitions for lodash 4.14
// TypeScript Version: 2.2
// at DefinitelyTyped/types/lodash/index.d.ts commit 8c51dc56

export = _;
export as namespace _;

declare let _: _.LoDashStatic;

declare namespace _ {
  // type Many<T> = T | T[];

  // interfaces are merged: https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  interface LoDashStatic {
    VERSION: string;
  }
}

declare global {
  interface Set<T> { }
  interface Map<K, V> { }
  interface WeakSet<T> { }
  interface WeakMap<K extends object, V> { }
}
