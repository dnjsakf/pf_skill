/* React */
import React from 'react';

/* Router */
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

/* Custom Components */
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

/* Layout Components */
const RouteWithLayout = React.lazy(()=>import('./layouts/RouteWithLayout'));
const MainLayout = React.lazy(()=>import('./layouts/Main'));

/* Route Components */
const Home = React.lazy(()=>import('./routes/Home'));
const Skills = React.lazy(()=>import('./routes/Skills'));
const Settings = React.lazy(()=>import('./routes/Settings'));

/* Main Component */
class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      hasError: false,
    };
  }

  /**
   *  Handlers
   **/

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
    console.groupCollapsed(`App.shouldComponentUpdate`);
    console.log("props", {
      crnt: this.props,
      next: nextProps
    });
    console.log("state", {
      crnt: this.state,
      next: nextState
    });
    console.groupEnd(`App.shouldComponentUpdate`);

    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    console.groupCollapsed(`App.getSnapshotBeforeUpdate`);
    console.log("prevProps:", prevProps);
    console.log("prevState:", prevState);
    console.groupEnd(`App.getSnapshotBeforeUpdate`);

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.groupCollapsed(`App.componentDidUpdate`);
    console.log("prevProps:", prevProps);
    console.log("prevState:", prevState);
    console.log("snapshot:", snapshot);
    console.groupEnd(`App.componentDidUpdate`);
  }

  componentDidCatch(error, info){
    console.groupCollapsed(`App.componentDidCatch`);
    console.log("error:", error);
    console.log("info:", info);
    console.groupEnd(`App.componentDidCatch`);
  }

  componentWillUnmount(){
    console.log(`App.componentWillUnmount`);
  }

  render(){
    return (
      <ErrorBoundary>
        <Router>
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
            <RouteWithLayout
              path="/skills"
              layout={ MainLayout }
              component={ Skills }
            />
            <RouteWithLayout
              path="/settings"
              layout={ MainLayout }
              component={ Settings }
            />
            <RouteWithLayout
              path="/notfound"
              layout={ MainLayout }
              component={ NotFound }
            />
            <Redirect to="/notfound" />
          </Switch>
        </Router>
      </ErrorBoundary>
    )
  }
}

/* Main Component Settings */
App.defaultProps = {
};

/* Exports */
export default App;