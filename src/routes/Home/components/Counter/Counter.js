import React from 'react';
import styled, { keyframes, css } from "styled-components";

const rotation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const scale = keyframes`
  from{
    transform: scale( 1.2 );
  }
  to{
    transform: scale( 1.0 );
  }
`;

const Heading3 = styled.h3`
  font-size: 2em;
`;

const Button = styled.button`
  ${({ animate, duration })=> {
    if( animate ) {
      return css`
        &:active {
          animation: ${scale} ${duration} linear;
        }
      `;
    }
  }}
`;

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    if( this.state.count === 5 ){
      throw new Error("Some error...");
    }
    return (
      <div>
        <Heading3>{ this.state.count }</Heading3>
        <Button
          { ...this.props }
          onClick={ this.handleClick }
          animate duration="1000ms"
        >
          { this.props.children }
        </Button>
      </div>
    );
  }
}

export default Counter;