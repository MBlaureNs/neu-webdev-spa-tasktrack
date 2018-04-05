//based on code from ntuck
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import store from '../store';

let LoginForm = connect(({login, users}) => {return {login, users};})((props) => {
  function update(ev) {
    let target = $(ev.target);
    let data = {};
    data[target.attr('name')] = target.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    //console.log(props.login);
  }

  function register_user(ev) {
    api.submit_register(props.login);
  }

  return (
    <div>
      <Form inline>
	<FormGroup>
	  <Input type="text" name="username" placeholder="username"
		 value={props.login.username} onChange={update}/>
	</FormGroup>
	<FormGroup>
	  <Input type="password" name="password" placeholder="password"
		 value={props.login.password} onChange={update}/>
	</FormGroup>
	<Button onClick={create_token}>Login</Button>
	<Button onClick={register_user}>Register</Button>
      </Form>
    </div>);
});



let log_out = function(ev) {
  store.dispatch({
    type: 'CLEAR_TOKEN'
  });
};

let Session = connect(({token}) => {return {token};})((props) => {
  return <div className="navbar-text">
    Welcome, {props.token.user_username}. 
    <NavLink to={"/users/"+props.token.user_id} exact={true}><Button>Profile</Button></NavLink>
    <Button onClick={log_out}>Log out</Button>
  </div>;
});

function Nav(props) {
  let session_info;
  if (props.token) {
    session_info = <Session token = {props.token}/>;
  } else {
    session_info = <LoginForm/>;
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
	tasktrack ouo
      </span>
      <ul className="navbar-nav mr-auto">
	<NavItem>
	  <NavLink to="/" exact={true} activeClassName="active" className="nav-link">index</NavLink>
	</NavItem>
	<NavItem>
	  <NavLink to="/users" href="#" className="nav-link">users</NavLink>
	</NavItem>
      </ul>
      {session_info}
    </nav>
  );
}

function statetoprops(state) {
  return {
    token: state.token
  };
}

export default connect(statetoprops)(Nav);
