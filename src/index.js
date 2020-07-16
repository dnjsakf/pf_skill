/* Webpack */
import { hot } from 'react-hot-loader/root';

/* React */
import React from "react";
import { render as RouterDomRender } from "react-dom";

/* Redux */
import { createStore } from "redux";
import { Provider as StoreProvider } from "react-redux";
import rootReducer from "./reducers";

/* GraphQL */
import { MockedProvider } from '@apollo/react-testing';
import { ApolloProvider } from "react-apollo";
import client from "./graphql/client";
import mocks from './graphql/mocks';

/* Material-UI */
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

/* Notistack */
import { SnackbarProvider } from 'notistack';

/* Common Component */
import { CircularSuspense } from "./components/Suspense";

/* App Component */
const App = React.lazy(() => import("./App"));

/* Create Redux Store */
const store = createStore( rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

/* Renderer */
function render(Component){
  const root = document.getElementById("root");
  
  Component = module.hot ? hot( Component ) : Component;
  
  RouterDomRender(
    <CircularSuspense>
      <StoreProvider store={ store }>
        <ApolloProvider client={ client }>
          {/* <MockedProvider mocks={ mocks } addTypename={ false }> */}
          <MockedProvider mocks={ mocks } addTypename={ false }>
            <ThemeProvider theme={ theme }>
              <SnackbarProvider 
                maxSnack={3} 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Component/>
              </SnackbarProvider>
            </ThemeProvider>
          </MockedProvider>
          {/* </MockedProvider> */}
        </ApolloProvider>
      </StoreProvider>
    </CircularSuspense>
    , root
  );
}

render( App );