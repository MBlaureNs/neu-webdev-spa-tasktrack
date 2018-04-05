//based on code from ntuck
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Users from './users';
import Tasks from './tasks';
import Fulltask from './fulltask';
import Newtask from './newtask';
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

function task_from_id(tasks, task_id) {
  let t = _.find(tasks, (x) => x.id == task_id);
  return t;
}

let Tasktrack = connect((state) => state)((props) => {
  console.log(props);
  return (
    <Router>
      <div>
	<Nav/>
	<Flash flash={props.flash}/>
	<Route path="/" exact={true} render={() =>
          <div>
	    <Newtask/>
	    <hr/>
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
	<Route path="/tasks/:task_id" exact={true} render={({match}) =>
          <div>
            <Fulltask task={task_from_id(props.tasks, match.params.task_id)} users={props.users}/>
          </div>
        }/>
      </div>
    </Router>
  );
});
