/* React */
import React, { Suspense } from "react";
import { render as RouterDomRender } from "react-dom";

/* Redux */
import { createStore } from "redux";
import { Provider as StoreProvider } from "react-redux";
import rootReducer from "./reducers";

/* Material UI */
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

/* GraphQL */
import { ApolloProvider } from "react-apollo";
import client from "./graphql/client";

/* Webpack */
import { hot } from 'react-hot-loader/root';

/* Common Component */
import ErrorBoundary from "./components/ErrorBoundary";
import CircularProgress from "./components/Progress/CircularProgress";

/* App Component */
const App = React.lazy(() => import("./App"));

/* Create Redux Store */
const store = createStore( rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

/* Renderer */
function render(Component){
  const root = document.getElementById("root");
  
  Component = module.hot ? hot( Component ) : Component;
  
  RouterDomRender(
    <ErrorBoundary>
      <Suspense fallback={ <CircularProgress /> }>
        <StoreProvider store={ store }>
          <ApolloProvider client={ client }>
            <ThemeProvider theme={ theme }>
              <Component/>
            </ThemeProvider>
          </ApolloProvider>
        </StoreProvider>
      </Suspense>
    </ErrorBoundary>
    , root
  );
}

render( App );