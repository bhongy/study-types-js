/* at facebook/flow c7771d0 */

/**
 * Open Questions
 * ---
 * 1) $React$Element<+ElementType: ...> or ChildrenArray<+T>
 * 2) export Children -> map ... $NonMaybeType
 * 3) $Subtype vs $Supertype vs $Shape
 */

declare type React$Node =
  | void
  | null
  | boolean
  | number
  | string
  | React$Element<any>
  | React$Portal
  | Iterable<React$Node>; // Iterable -> string, Array, Map, Set

declare class React$Component<Props, State = void> {
  props: Props;
  state: State;

  setState(
    partialState: $Shape<State> | ((State, Props) => $Shape<State> | void),
    callback?: () => mixed,
  ): void;

  forceUpdate(callback?: () => void): void;

  constructor(props?: Props, context?: any): void;
  render(): React$Node;
  componentWillMount(): mixed;
  componentDidMount(): mixed;
  componentWillReceiveProps(
    nextProps: Props,
    nextContext: any,
  ): mixed;
  shouldComponentUpdate(
    nextProps: Props,
    nextState: State,
    nextContext: any,
  ): boolean;
  componentWillUpdate(
    nextProps: Props,
    nextState: State,
    nextContext: any,
  ): mixed;
  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    prevContext: any,
  ): mixed;
  componentWillUnmount(): mixed;

  refs: any;
  context: any;
  getChildContext(): any;
  static displayName?: ?string;
  static childContextTypes: any;
  static contextTypes: any;
  static propTypes: $Subtype<{[_: $Keys<Props>]: any}>;
}

declare class React$PureComponent<Props, State = void>
  extends React$Component<Props, State> {
  props: Props;
  state: State;
}

declare class LegacyReactComponent<Props, State>
  extends React$Component<Props, State> {
  replaceState(state: State, callback?: () => void): void;
  isMounted(): boolean;
  props: Props;
  state: State;
}

declare type React$StatelessFunctionalComponent<Props> = {
  // better type instead of React$Element<any> -> React$Element<Props>?
  (props: Props, context: any): React$Node,
  displayName?: ?string,
  propTypes?: $Subtype<{[_: $Keys<Props>]: any}>,
  contextTypes?: any,
};

// custom components <MyComponent />
// these are functions/classes hence `Class<...>`
// `React$Component` refers to the instance not the class
declare type React$ComponentType<Props> =
  | React$StatelessFunctionalComponent<Props>
  | Class<React$Component<Props, any>>;

// the name is a bit confusing - it's still a component
// this is all "components" including intrinsics
declare type React$ElementType =
  | string // intrinsics - e.g. react-dom has 'div', 'a', etc.
  | React$ComponentType<any>;
  // this basically spread to:
  // | React$StatelessFunctionalComponent<any>
  // | Class<React$Component<any, any>>;

declare type React$Key = string | number;

declare type React$Elment<+ElementType: React$ElementType> = {|
  +type: ElementType,
  +props: React$ElementProps<ElementType>,
  +key: React$Key | null,
  +ref: any,
|};

// React$ElementRef is internal (ML)
declare type React$Ref<ElementType: React$ElementType> =
  | ((React$ElementRef<ElementType> | null) => mixed)
  | string;

// React$Portal is internal (ML)
declare opaque type React$Portal;

// you have to import * as React from 'react' to get these types
// then use them like: `React.Node`
// or import type { Node } from 'react'
declare module react {
  declare export var DOM: any;
  declare export var PropTypes: ReactPropTypes;
  declare export var version: string;

  declare export function initializeTouchEvents(shouldUseTouch: boolean): void;
  declare export function isValidElement(element: any): boolean;
  declare export function checkPropTypes<V>(
    propTypes: $Subtype<{[_: $Keys<V>]: ReactPropsCheckType}>,
    values: V,
    location: string,
    componentName: string,
    getStack: ?(() => ?string),
  ): void;

  // these types are internal (ML)
  declare export var createClass: React$CreateClass; // legacy
  declare export var createElement: React$CreateElement;
  declare export var cloneElement: React$CloneElement;
  declare export function createFactory<ElementType: React$ElementType>( // legacy
    type: ElementType,
  ): React$ElementFactory<ElementType>;

  declare export var Component: typeof React$Component;
  declare export var PureComponent: typeof React$PureComponent;
  // export type aliases
  declare export type StatelessFunctionalComponent<P> =
    React$StatelessFunctionalComponent<P>;
  declare export type ComponentType<P> = React$ComponentType<P>;
  declare export type ElementType = React$ElementType;
  declare export type Element<C> = React$Element<C>;
  // declare export var Fragment: <T: React$Node>({ children: T }) => T;
  // declare export var Fragment: ({ children: React$Node }) => React$Node;
  declare export type Key = React$Key;
  declare export type Ref<C> = React$Ref<C>;
  declare export type Node = React$Node;
  declare export type Portal = React$Portal;

  // these types are internal (ML)
  declare export type ElementProps<C> = React$ElementProps<C>;
  declare export type ElementConfig<C> = React$ElementConfig<C>;
  declare export type ElementRef<C> = React$ElementRef<C>;

  // ChildrenArray is either an array of type T (can be nested, type recursive)
  // or just the type T
  // see ./sandbox.js for examples
  declare export type ChildrenArray<+T> = $ReadOnlyArray<ChildrenArray<T>> | T;
  // $NonMaybeType<T> (ML) acts as the type T without null and void
  declare export var Children: {
    map<T, U>(
      children: ChildrenArray<T>,
      // why needing $NonMaybeType here?
      // implementation skips null and undefined ?
      fn: (child: $NonMaybeType<T>, index: number) => U,
      thisArg?: mixed,
    // This return type might be wrong. The implementation in
    // `ReactChildren.js -> mapChildren` return `children`
    // if it's null or undefined
    ): Array<$NonMaybeType<U>>;
    forEach<T>(
      children: ChildrenArray<T>,
      fn: (child: T, index: number) => mixed,
      thisArg?: mixed,
    ): void;
    count(children: ChildrenArray<any>): number;
    only<T>(children: ChildrenArray<T>): $NonMaybeType<T>;
    toArray<T>(children: ChildrenArray<T>): Array<$NonMaybeType<T>>;
  }

  // this is what you get when import React from 'react'
  declare export default {|
    +DOM: typeof DOM,
    +PropTypes: typeof PropTypes,
    +version: typeof version,
    +initializeTouchEvents: typeof initializeTouchEvents,
    +checkPropTypes: typeof checkPropTypes,
    +createClass: typeof createClass, // legacy
    +createElement: typeof createElement,
    +cloneElement: typeof cloneElement,
    +createFactory: typeof createFactory, // legacy
    +isValidElement: typeof isValidElement,
    +Component: typeof Component,
    +PureComponent: typeof PureComponent,
    +Children: typeof Children,
  |};
}

// local

type ReactPropsCheckType = (
  props: any,
  propName: string,
  componentName: string,
  href?: string,
) => ?Error;

type ReactPropTypes = {
  array: React$PropType$Primitive<Array<any>>;
  bool: React$PropType$Primitive<boolean>;
  func: React$PropType$Primitive<Function>;
  number: React$PropType$Primitive<number>;
  object: React$PropType$Primitive<Object>;
  string: React$PropType$Primitive<string>;
  any: React$PropType$Primitive<any>;
  arrayOf: React$PropType$ArrayOf;
  element: React$PropType$Primitive<any>; /* TODO */
  instanceOf: React$PropType$InstanceOf;
  node: React$PropType$Primitive<any>; /* TODO */
  objectOf: React$PropType$ObjectOf;
  oneOf: React$PropType$OneOf;
  oneOfType: React$PropType$OneOfType;
  shape: React$PropType$Shape;
};
