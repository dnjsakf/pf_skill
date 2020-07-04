import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

/* Layouts */
const RouteWithLayout = React.lazy(()=>import('./layouts/RouteWithLayout'));
const MainLayout = React.lazy(()=>import('./layouts/Main'));

/* Routes */
const Home = React.lazy(()=>import('./routes/Home'));
const NotFound = React.lazy(()=>import('./routes/NotFound'));

/* Component */
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      toggle: this.props.toggle,
      hasError: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
   *  Handlers
   **/
  handleToggle( event ){
    console.log("handleToggle", event);
    this.setState((state, props)=>(Object.assign(state, {
      toggle: !state.toggle
    })));
  }

  /**
   *  Life Cycle 
   **/
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error);
    return { hasError: true };
  }

  componentDidMount(){
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState){
    console.group("shouldComponentUpdate");
    console.log("nextProps:", nextProps);
    console.log("nextState:", nextState);
    console.groupEnd("shouldComponentUpdate");

    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    console.group("getSnapshotBeforeUpdate");
    console.log("prevProps:", prevProps);
    console.log("prevState:", prevState);
    console.groupEnd("getSnapshotBeforeUpdate");

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.group("componentDidUpdate");
    console.log("prevProps:", prevProps);
    console.log("prevState:", prevState);
    console.log("snapshot:", snapshot);
    console.groupEnd("componentDidUpdate");
  }

  componentDidCatch(error, info){
    console.group("componentDidCatch");
    console.log("error:", error);
    console.log("info:", info);
    console.groupEnd("componentDidCatch");
  }

  componentWillUnmount(){
    console.log("componentWillUnmount");
  }

  render(){
    return (
      <Router>
        <Suspense fallback={<h3>App Loading...</h3>}>
          <Switch>
            <Redirect
              exact
              from="/"
              to="/home"
            />
            <RouteWithLayout
              path="/home"
              layout={ MainLayout }
              component={ Home }
            />
            <Route
              exact
              path="/not-found"
              component={ NotFound }
            />
            <Redirect to="/not-found" />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

App.defaultProps = {
  toggle: false
};

export default App;