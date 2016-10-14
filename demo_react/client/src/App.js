import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NavLink from './NavLink'
class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <aside className="primary-aside">
                    <ul>
                        <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
                        <li><NavLink to="/list">List all task</NavLink></li>
                        <li><NavLink to="/new">Create new task</NavLink></li>
                    </ul>
                </aside>
                <main className="main-content">
                    {this.props.children}
                </main>
            </div>

        );
    }
}
export default App;
