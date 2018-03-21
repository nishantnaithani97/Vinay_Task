import React, { Component } from 'react';
import Login from './Login.js';
import Register from './Register.js';
import Todo from './Todo.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
export default class App extends Component {
    render() {
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/todo" component={Todo} />
                    </Switch>
                </BrowserRouter>
            </div>

        )
        }
    }
