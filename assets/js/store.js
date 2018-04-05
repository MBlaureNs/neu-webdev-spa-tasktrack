//based on code from ntuck
//http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASKS_LIST':
      return [...action.tasks];
    case 'ADD_TASK':
      return [action.task, ...state];
    default:
      return state;
  }
}

function users(state = [], action) {
  //console.log(action);
  switch (action.type) {
    case 'USERS_LIST':
      return [...action.users];
    default:
      return state;
  }
}

let empty_form = {
  user_id: "",
  body: "",
  token: "",
}

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'CLEAR_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  username: "",
  password: "",
}

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      //console.log(action);
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_flash = {
  message: "",
}

function flash(state = empty_flash, action) {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      //console.log(action);
      return Object.assign({}, state, action.data);
    default:
      return empty_flash;
  }
}

function root_reducer(state0, action) {
  //console.log("reducer", action);

  let reducer = combineReducers({tasks, users, form, token, login, flash});
  let state1 = reducer(state0, action);

  //console.log("state1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
