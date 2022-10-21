import './App.css';
//rcc
import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import { News } from './Component/News';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';

export default class App extends Component {
  pageSize=9;
  apikey="9bf215494e244f1bbb86bc4bb67c78aa";
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <Switch>
        <Route exact path='/'><News key="gen"  apikey={this.apikey} pageSize={this.pageSize} country="in" category="general"/></Route>
        <Route exact path='/science'><News key="sci"  apikey={this.apikey} pageSize={this.pageSize} country="in" category="science"/></Route>
        <Route exact path='/sports'><News key="spts" apikey={this.apikey}  pageSize={this.pageSize} country="in" category="sports"/></Route>
        <Route exact path='/entertainment'><News key="ent"  apikey={this.apikey} pageSize={this.pageSize} country="in" category="entertainment"/></Route>
        <Route exact path='/technology'><News key="tech" apikey={this.apikey}  pageSize={this.pageSize} country="in" category="technology"/></Route>
        <Route exact path='/business'><News key="bus"  apikey={this.apikey} pageSize={this.pageSize} country="in" category="business"/></Route>

        </Switch>
        </Router>
      </div>
    )
  }
}
