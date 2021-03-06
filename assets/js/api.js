//based on code from ntuck
//http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import store from './store';

class ApiServer {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
	store.dispatch({
	  type: 'TASKS_LIST',
	  tasks: resp.data,
	});
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
	store.dispatch({
	  type: 'USERS_LIST',
	  users: resp.data,
	});
      },
    });
  }
  
  submit_task(data) {
    //console.log(data);
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data}),
      success: (resp) => {
	store.dispatch({
	  type: 'ADD_TASK',
	  task: resp.data,
	});
      },
    });
  }
  
  submit_login(data) {
    //console.log("submit_login", data);
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
	store.dispatch({
	  type: 'SET_TOKEN',
	  token: resp,
	});
      },
    });
  }
  
  submit_register(data) {
    //console.log("submit_register", data);
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user: data}),
      success: (resp) => {
	store.dispatch({
	  type: 'REGISTER_SUCCESS',
	  data: {
	    message: "Successfully registered user \""+data.username+"\", please log in",
	    user: resp.data
	  }
	});
      },
    });
  }
}

export default new ApiServer();
