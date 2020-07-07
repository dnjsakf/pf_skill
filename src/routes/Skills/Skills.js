import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const SkillsMain = React.lazy(()=>(import('./components/SkillsMain')));
const SkillsELK = React.lazy(()=>(import('./components/SkillsELK')));

const NotFound = ( props )=>{
  const {
    className
  } = props;

  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  )
}

const Container = styled.div`
`;

class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Suspense fallback={<h3>Skills Loading...</h3>}>
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
            path="/skills/notfound"
            component={ NotFound }
          />
          <Redirect to="/skills/notfound" />
        </Switch>
      </Suspense>
    );
  }
}
 
export default Skills;