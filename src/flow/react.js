declare type React$Node =
  | void
  | null
  | boolean
  | number
  | string
  // | React$Element<any>
  // | React$Portal
  // | Iterable<React$Node>

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
  extends React$COmponent<Props, State> {
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

// declare type React$Elment<+ElementType: React$ElementType> = {|
//   +type: ElementType,
//   +props: React$ElementProps<ElementType>,
//   +key: React$Key | null,
//   +ref: any,
// |};

declare type React$Key = string | number;
