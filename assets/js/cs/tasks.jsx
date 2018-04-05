//based on code from ntuck
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import React from 'react';
import { Link } from 'react-router-dom';

function Task(params) {
  return <p>
    <Link to={"/tasks/"+params.task.id}>ID#{params.task.id}: {params.task.title}</Link>
  </p>;
}

export default function Tasks(params) {
  let tasks = params.tasks;
  tasks = _.map(tasks, (t) => <Task key={t.id} task={t}/>);
  return <div>
    {tasks}
  </div>;
}
