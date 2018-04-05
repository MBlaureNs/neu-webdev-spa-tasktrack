//based on code from ntuck
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import React from 'react';
import { Link } from 'react-router-dom';

function Task(params) {
  if (params.task.assignee_id) {
    return <tr>
      <td>{params.task.id}</td>
      <td><Link to={"/tasks/"+params.task.id}>{params.task.title}</Link></td>
      <td>{params.task.act_time}</td>
      <td>{params.task.completed ? "Yes" : "No"}</td>
      <td><Link to={"/users/"+params.task.requester_id}>{params.task.requester_name}</Link></td>
      <td><Link to={"/users/"+params.task.assignee_id}>{params.task.assignee_name}</Link></td>
    </tr>;
  } else {
    return <tr>
      <td>{params.task.id}</td>
      <td><Link to={"/tasks/"+params.task.id}>{params.task.title}</Link></td>
      <td>{params.task.act_time}</td>
      <td>{params.task.completed ? "Yes" : "No"}</td>
      <td><Link to={"/users/"+params.task.requester_id}>{params.task.requester_name}</Link></td>
      <td>{params.task.assignee_name}</td>
    </tr>;
  }
}

export default function Tasks(params) {
  let tasks = params.tasks;
  if (params.assignee_id) {
    tasks = _.filter(tasks, (t) => t.assignee_id == params.assignee_id);
  }
  if (params.requester_id) {
    tasks = _.filter(tasks, (t) => t.requester_id == params.requester_id);
  }
  tasks = _.map(tasks, (t) => <Task key={t.id} task={t}/>);
  return <div>
    <table className="table">
      <thead>
	<tr>
	  <th>ID</th>
          <th>Title</th>
          <th>Time spent</th>
          <th>Completed</th>
          <th>Requester</th>
          <th>Assignee</th>
	</tr>
      </thead>
      <tbody>
	{tasks}
      </tbody>
    </table>
  </div>;
}
