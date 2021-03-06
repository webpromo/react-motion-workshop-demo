import React, { Component } from 'react';
import { Motion, spring, StaggeredMotion, presets, TransitionMotion } from 'react-motion'
import styled from 'styled-components'
import logo from './logo.svg';
import './App.css';

const Nav = styled.nav`
  width: 100%;
  height: 50px;
  background: rgb(240,70,70);
  position: fixed;
  top: 0;
  justify-content: space-between;
  display: flex;
  box-sizing: border-box;
  padding: 20px;
  font-size: 25px;
  z-index: 2;
  align-items: center;
`
const NavDrop = styled.div`
  width: 100%;  
  background: rgb(240,70,70);
  height: 150px;
  opacity: 1;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  background: rgb(240,70,70);
  height: ${props => props.height}px;
  opacity: ${props => props.opacity};
  overflow: hidden;
  > h1 {
    margin-top: 85px;
  }
`
const MenuToggle = styled.button`
  width: 40px;
  height: 40px;
  background: rgb(200,40,8);
  border-radius: 10px;
  > div {
    width: 90%;
    margin: 5px auto;
    height: 3px;
    border-radius: 1px;
    background: black;
  }
`

const Title = styled.h1`
  position: relative;
  left: ${ props => props.left}px;
`
const Subtitle = styled.h3`
  position: relative;
  left: ${ props => props.left}px;
  `

const Logo = styled.img`
  position: relative;
  left: ${ props => props.left}px;
`

const Message = styled.div`
  height: ${props => props.height}px;
  width: 400px;
  border: 1px solid black;
  margin: 50 auto;
`

class App extends Component {
  constructor() {
    super()
    this.state = {
      messageInput: '',
      currentId: 4,
      messages: [
        {
          id: 1,
          text: 'Hello World'
        },
        {
          id: 2,
          text: 'Its Ya Boi'
        },
        {
          id: 3,
          text: 'Dev 4Lyfe'
        },
      ],
      menuOpen: false
    }
  }

  handleChange = ({target:{value}}) => {
    this.setState({
      messageInput: value
    })
  }

  deleteMessage = (key) => {
    const newMessages = this.state.messages.filter( ({id}) => id != key)
    this.setState({
      messages: newMessages
    })
  }

  handleSubmit = (e) => {
    const { messages, messageInput, currentId } = this.state
    e.preventDefault();
    this.setState({
      messages: [ ...messages, { text: messageInput, id: currentId } ],
      messageInput: '',
      currentId: currentId + 1
    })
  }

  willEnter = () => {
    return {
      height: 0,
    }
  }

  willLeave = () => {
    return {
      height: spring(0)
    }
  }

  getDefaultStyles = () => {
    return this.state.messages.map( ({id, text}) => (
      {key: id, data: text, style: {height:0}}
    ))
  }

  getStyles = () => {
    const mapped = this.state.messages.map( ({id, text}) => (
      { key: id, data: text, style: {height: spring(60)} }
    ))
    return mapped
  }

  listItems = (styles) => {
    const styledList = styles.map( ({key, data, style}) => {
      return (
        <Message
          onClick={ () => this.deleteMessage(key) } 
          height={ style.height } key={ key } >
            { data }
        </Message>
      )
    }) 

    return (
      <React.Fragment>
        { styledList }
      </React.Fragment>
    )
  }

  render() {

    return (
      <div className="App">
        <Motion
          defaultStyle={{height: 0, opacity: 1}}
          style={{height: spring(this.state.menuOpen ? 600 : 0), opacity: 1}}>
          { (style) => (
            <div>

              <Nav>
                React Motion
                <div>Dropdown height is: {style.height} Opacity: {style.opacity} </div>
                <MenuToggle onClick={() => this.setState({menuOpen: !this.state.menuOpen})}>
                  <div></div>
                  <div></div>
                  <div></div>
                </MenuToggle>
              </Nav>

              <NavDrop height={style.height} opacity={style.opacity}>
                <h1> Surprise! </h1>
              </NavDrop>

            </div>
          )}
        </Motion>
        <header className="App-header">
          <StaggeredMotion
            defaultStyles={[
              {left: 1090},
              {left: 1090},
              {left: 1090}
            ]}
            styles={ (prevStyles) => [
              {left: spring(0, {precision: 90, stiffness: 60, damping: 5 })},
              {left: prevStyles[0].left},
              {left: prevStyles[1].left}
          ]}>
          {(styles) => (
            <div>
              <Logo left={styles[0].left} src={logo} className="App-logo" alt="logo" />
              <Title left={styles[1].left} className="App-title">Welcome to React Motion</Title>
              <Subtitle left={styles[2].left} className="App-title">Watch This Workshop Change Your Life</Subtitle>
            </div>
          )}
          </StaggeredMotion>
        </header>
        
        <form onSubmit={ this.handleSubmit }>
          <input type="text" value={ this.state.messageInput } onChange={ this.handleChange }/>
          <button type='submit'>Submit</button>
        </form>
        <TransitionMotion
          defaultStyles={ this.getDefaultStyles() }
          styles={ this.getStyles() }
          willEnter={ this.willEnter }
          willLeave={ this.willLeave }
        >
          { this.listItems }
        </TransitionMotion>
       
      </div>
    );
  }
}

export default App;
