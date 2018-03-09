// @flow
import * as React from 'react';

class New extends React.Component<{ date: Date }> {
  render() {
    return this.props.date;
  }
}

<React.Fragment>
  <New date={new Date()} />
  <New date={new Date(1520049898985)} />
</React.Fragment>

type One = {| prop: number |};
type Two = {| prop: boolean |};

type Both = One & Two;

// $FlowExpectError
var v1: One & Two = {
  prop: 1 // Error!
};

var v2: {| ...One, ...Two, ...One |} = { prop: 1 };
var v3: {| ...One, ...Two, ...One |} = { prop: 1 };

// ---

type TopLevel = {
  descendents: number,
  score: number,
  title: string,
};

type Username = string;
type ID = number;
type URL = string;
type ItemCommon = {
  by: Username,
  id: ID,
  time: number,
};

type Item =
  | { type: 'story', kids: ID[], url: URL }                 & ItemCommon & TopLevel
  | { type: 'ask',  kids: ID[], text: string, url: URL }    & ItemCommon & TopLevel
  | { type: 'job', text: string, url: URL }                 & ItemCommon & TopLevel
  | { type: 'poll', kids: ID[], parts: ID[], text: string } & ItemCommon & TopLevel
  | { type: 'pollopt', parent: ID, score: number, text: string } & ItemCommon
  | { type: 'comment', kids: ID[], parent: ID, text: string }    & ItemCommon;

function fetchItem(id: ID): Promise<Item> {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(res => res.json())
}

function getTitle(item: Item): string {
  switch (item.type) {
    // case 'story':
    // case 'ask':
    // case 'job':
    // case 'poll':
    //   return item.title;
    case 'story':
      return `"${item.title}" submitted by ${item.by}`
    case 'ask':
      return `${item.by} asked: ${item.title}`
    case 'job':
      return `job posting: ${item.title}`
    case 'poll':
      return `poll: "${item.title}" - choose one of ${item.kids.length} options`
    default:
      // $FlowExpectError
      (item.type: empty);
      throw new Error(`unknown item type: ${item.type}`);
  }
}

function flatMap<T, U>(xs: Array<T>, mapper: (x: T) => Array<U>): Array<U> {
  const result = [];
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    result.push.apply(result, mapper(x));
  }
  return result;
}



type A = {| a: string |};
type B = { b: string };

declare var a: A;
declare var b: B;

const c = { ...a };
const d = { ...b };
const e = { ...a, ...b };
const f: { a: string, b: string } = { ...a, ...b };
// $FlowExpectError: Only this case triggers an error
const g: {| a: string, b: string |} = { ...a, ...b };


// in React, 2 forms of components: Stateless, Class

// generics of classes, type aliases, and interfaces are parameterized
// not for function

class MyDummyJavascriptClass {
  props: mixed;
  constructor(props) {
    this.props = props;
  }
}

// class MyDummyJavascriptClass<P> {
//   props: P;
//   constructor(props: P) {
//     this.props = props;
//   }
// }
//
// type Props = { size: 'sm' | 'md' | 'lg' };
// const c: MyDummyJavascriptClass<Props> = new MyDummyJavascriptClass({ size: 'sm' });

class MyComponent extends React.Component<{}> {
  render() {
    return <div />;
  }
}

// const MyStatelessComponent = (props) => <div />;
const MyStatelessComponent = (props) => {
  return <div />;
};


// --- Example Union of primitives, one in all out

// function toStringPrimitives(value: number | boolean | string): string { // Error (didn't handle input with type string)
//   if (typeof value === 'number') {
//     return String(value);
//   } else if (typeof value === 'boolean') {
//     return String(value);
//   }
// }


// --- Pass example, subtype of object (width subtyping), try exact ObjectA

// type ObjectA = { foo: string };
// type ObjectB = { foo: string, bar: number };
//
// let objectB: ObjectB = { foo: 'test', bar: 42 };
// let objectA: ObjectA = objectB; // Works!


// --- Failed example, subtype of object

// type ObjectA = { foo: string | number };
// type ObjectB = { foo: number, bar: number };
//
// let objectB: ObjectB = { foo: 1, bar: 2 };
// let objectA: ObjectA = objectB; // Error


// --- Failed example, Depth Subtyping
// https://flow.org/en/docs/lang/depth-subtyping/

// class Person { name: string }
// class Employee extends Person { department: string }
//
// var employee: { who: Employee } = { who: new Employee };
// var person: { who: Person } = employee; // Error


// --- Interesting Properties of & vs ... in Object Types (disjointed)

// type One = { foo: number };
// type Two = { bar: boolean };
//
// type Both = One & Two;
//
// const v1: Both = {
//   foo: 1,
//   bar: true,
// };
//
// const v2: { ...One, ...Two } = {
//   foo: 1,
//   bar: true,
// };


// --- Interesting Properties of & vs ... in Object Types (shared key name)

// type One = { foo: number };
// type Two = { foo: boolean };
//
// type Both = One & Two;
//
// const v1: Both = { foo: 1 }; // Error
// const v2: { ...One, ...Two } = {
//   foo: 1,
//   // bar: true
// };
