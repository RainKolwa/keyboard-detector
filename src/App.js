import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      activeKey: ''
    }
  }
  componentDidMount() {
    if (document.addEventListener)
    {
       document.addEventListener("keydown", this.keydown, false);
       document.addEventListener("keypress", this.keypress, false);
       document.addEventListener("keyup", this.keyup, false);
    }
  }
  
  addRecord = (w, e) => {
    console.log(e)
    this.setState({
      list: this.state.list.concat([e])
    })
  }
  
  keydown = (e) => {
     if (!e) return;
     this.setState({
       activeKey: e.key
     })
     this.addRecord('keydown', e);
     return this.preventDefaultBehavior(e, true);
  }

  keyup = (e) => {
     if (!e) return;
     this.addRecord('keyup', e);
     return this.preventDefaultBehavior(e, true);
  }

  keypress = (e) => {
     if (!e) return;
     this.addRecord('keypress', e);
     return this.preventDefaultBehavior(e, true);
  }
  
  preventDefaultBehavior = (e, flag) => {
     if (flag)
     {
       if (e.preventDefault) e.preventDefault();
       if (e.stopPropagation) e.stopPropagation();
     }
     return !flag;
  }
  
  handleReset = () => {
    this.setState({
      list: []
    })
  }
  
  render() {
    const { list, activeKey } = this.state
    return (
      <div className="App">
        {list.length === 0 && <p>Press any key ...</p>}
        <ul>
        {list.map((item, index) => {
          return <li key={index}>{item.type} {item.code}</li>
        })} 
        </ul>
        <button className="button button-clear" onClick={()=>this.handleReset()}>重置</button>
        {activeKey &&
          <kbd className="key-active">{this.state.activeKey}</kbd>
        }
      </div>
    );
  }
}

export default App;
