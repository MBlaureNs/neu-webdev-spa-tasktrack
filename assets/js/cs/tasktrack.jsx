//based on code from ntuck
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Users from './users';
import Tasks from './tasks';
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

function username_from_id(users, user_id) {
  let u = _.find(users, (x) => x.id == user_id);
  if (u) {
    return u.username;
  } else {
    return "Unknown";
  }
}

let Tasktrack = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
	<Nav/>
	<Flash flash={props.flash}/>
	<Route path="/" exact={true} render={() =>
          <div>
            <Tasks tasks={props.tasks}/>
          </div>
        }/>
	<Route path="/users" exact={true} render={() =>
          <div>
            <Users users={props.users}/>
          </div>
        }/>
	<Route path="/users/:user_id" exact={true} render={({match}) =>
          <div>
            <p>User ID#{match.params.user_id}: {username_from_id(props.users, match.params.user_id)}</p>
	    <hr/>
	    Assigned tasks
	    <Tasks assignee_id={match.params.user_id} tasks={props.tasks}/>
	    <hr/>
	    Requesting tasks
	    <Tasks requester_id={match.params.user_id} tasks={props.tasks}/>
          </div>
        }/>
	<Route path="/users/:task_id" exact={true} render={({match}) =>
          <div>
            {match.params.user_id}
          </div>
        }/>
      </div>
    </Router>
  );
});
