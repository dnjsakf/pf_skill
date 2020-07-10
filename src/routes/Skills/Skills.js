/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Switch, Route, Redirect } from 'react-router-dom';

/* Custom Components */
import { CircularSuspense } from '@components/Suspense';

import NotFound from '@components/NotFound';

const SkillsMain = React.lazy(()=>(import('./components/SkillsMain')));
const SkillsELK = React.lazy(()=>(import('./components/SkillsELK')));
const SkillsETL = React.lazy(()=>(import('./components/SkillsETL')));

/* Another Components */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
class Skills extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {  }
  }
  
  render() { 
    return (
      <CircularSuspense>
        <Switch>
          <Redirect
            exact
            from="/skills"
            to="/skills/main"
          />
          <Route
            path="/skills/main"
            component={ SkillsMain }
          />
          <Route
            path="/skills/elk"
            component={ SkillsELK }
          />
          <Route
            path="/skills/etl"
            component={ SkillsETL }
          />
          <Route
            path="/skills/notfound"
            component={ NotFound }
          />
          <Redirect to="/skills/notfound" />
        </Switch>
      </CircularSuspense>
    );
  }
}

/* Main Component Settings */
Skills.propTypes = {
  
}

/* Exports */
export default Skills;