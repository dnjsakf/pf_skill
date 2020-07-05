import React, { Suspense } from 'react';
import { render as RouterDomRender } from 'react-dom';
import { hot } from 'react-hot-loader/root';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';

const App = React.lazy(() => import('./App'));

function render(Component){
  const root = document.getElementById('root');
  
  Component = module.hot ? hot( Component ) : Component;
  
  RouterDomRender(
    <Suspense fallback={<div>Loading...</div>}>
      <ApolloProvider client={ client }>
        <ThemeProvider theme={ theme }>
          <Component/>
        </ThemeProvider>
      </ApolloProvider>
    </Suspense>
    , root
  );
}

render( App );