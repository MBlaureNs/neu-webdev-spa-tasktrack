//based on code from ntuck
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Users from './users';
import Flash from './flash';

export default function tasktrack_init(store) {
  //console.log("tasktrackstate", store.getState());
  ReactDOM.render(
    <Provider store={store}>
      <Tasktrack state={store.getState()}/>
    </Provider>,
    document.getElementById('root'),
  );
}

let Tasktrack = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
	<Nav/>
	<Flash flash={props.flash}/>
	<Route path="/" exact={true} render={() =>
          <div>
            ouo
          </div>
        }/>
	<Route path="/users" exact={true} render={() =>
          <div>
            <Users users={props.users}/>
          </div>
        }/>
	<Route path="/users/:user_id" exact={true} render={({match}) =>
          <div>
            {match.params.user_id}
          </div>
        }/>
      </div>
    </Router>
  );
});
