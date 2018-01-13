// @flow
import * as React from 'react';

/**
 * Exhaustive Type Checking for Switch Case
 * ---
 * Use (action: empty); expression to make sure that all cases are handled
 * hence the default never reaches
 */

// just create scope to prevent name clashes between examples
function exhaustiveCheckingExample() {
  type State = { +value: boolean };
  type Action =
    | { type: "FOO", foo: boolean }
    | { type: "BAR", bar: boolean }
    | { type: "BAZ", baz: boolean };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "FOO":
        return { ...state, value: action.foo };
      case "BAR":
        return { ...state, value: action.bar };
      default:
        // $FlowExpectError: unhandled action type "BAZ"
        (action: empty);
        return state;
    }
  }
}


type Point = { x: number, y: number };
const origin: $ReadOnly<Point> = { x: 0, y: 0 };
// origin.x = 1;


/**
 * Type InjectProp React Higher-order Component
 */

function injectProp<Props: {}>(
  Component: React.ComponentType<Props>,
): React.ComponentType<$Diff<Props, { foo: number | void }>> {
  return function WrapperComponent(props: Props) {
    return <Component {...props} foo={42} />;
  };
}


/**
 * React.ChildrenArray behavior
 * ---
 * Expects just the type T or an array of type T
 * (in this example, T -> React.Element<'div'>)
 */

// just create scope to prevent name clashes between examples
function childArrayExample() {
  // $FlowExpectError: result is not nullable
  (undefined: React.ChildrenArray<React.Element<'div'>>);
  // $FlowExpectError: result is not nullable
  (null: React.ChildrenArray<React.Element<'div'>>);

  // nothing special here because we say type T is a union of null or div element
  // so the behavior is still the same - just the type T or T[]
  (null: React.ChildrenArray<React.Element<'div'> | null>);

  // this is the best way to demonstrate it
  (<div />: React.ChildrenArray<React.Element<'div'>>);
  ([<div />, [<div />]]: React.ChildrenArray<React.Element<'div'>>);
}


/**
 * Structurally Typing between class instances and objects using interface
 * ---
 * As in Javascript, instances of classes or objects are the same thing.
 * When structurally type, Flow understands prototype chain.
 */

// just create scope to prevent name clashes between examples
function interfaceStructuralTypeExample() {
  interface MyInterface {
    method(value: string): void;
  }

  class Foo implements MyInterface { method(input: string) { /* ... */ } }
  class Bar implements MyInterface { method(input: string) { /* ... */ } }

  const foo: MyInterface = new Foo();
  const bar: MyInterface = new Bar();
  const baz: MyInterface = { method(value: string): void {} };

  // $FlowExpectError: classes are nominally typed
  const foo2: Bar = new Foo();
}


/**
 * Using readonly to safely subtype a variable referencing the same object
 */

// just create scope to prevent name clashes between examples
function readonlyTypeExample() {
  type A = { foo: number, bar: number };
  type B = { foo: number | string };
  type C = { +foo: number | string };

  const a: A = { foo: 1, bar: 2 };
  // Below fails because we can mutate `b`
  // e.g. `b.foo = 'now it is string';`
  // and which also changes `a.foo` to a string (fail the type check)
  // $FlowExpectError
  const b: B = a;
  // This passes because we won't change `c.foo`
  const c: C = a;
}


/**
 * Example of Flow asserting object type with width subtyping
 * i.e. allowing trying to access extra props (e.g. "colour")
 * (should still be type safe though)
 */

// just create scope to prevent name clashes between examples
function flowObjectWidthSubtypingExample() {
  interface SquareConfig {
    color?: string;
    width?: number;
  }

  function createSquare(config: SquareConfig): { color: string; area: number } {
    const newSquare = { color: 'white', area: 100 };
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }

  const mySquare = createSquare({ color: 'black' });
  const mySquare2 = createSquare({ colour: 'black' });
}
