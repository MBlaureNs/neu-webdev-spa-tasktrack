import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let Taskform = connect(({form}) => {return {form};})((props) => {
  function update(ev) {
    let target = $(ev.target);
    let data = {};
    data[target.attr('name')] = target.val();
    //console.log(data);
    props.dispatch({
      type: 'UPDATE_FORM',
      data: data,
    });
  }
  
  function AssigneeSelect(params) {
    if (params.selected) {
      return <option selected value={params.user.id}>{params.user.username}</option>; 
    } else {
      return <option value={params.user.id}>{params.user.username}</option>;
    }
  }
  
  function AssigneeSelects(params) {
    let users = params.users;
    users = _.map(users, (u) => <AssigneeSelect key={u.id} user={u} selected={u.id==params.assignee_id}/>);
    return users;
  }

  let t = props.task;
  //console.log("tf", props);

  if (t) {
    return <Form>
      <h2>Task ID#{t.id}: {t.title}</h2>
      <table className="table">
	<tbody>
	  <tr>
	    <td>Requester</td>
	    <td>{t.requester_name}</td>
	    <td></td>
	  </tr>
	  <tr>
	    <td>Assignee</td>
	    <td>{t.assignee_name}</td>
	    <td>
	      <FormGroup>
		<Input type="select" name="assignee_id" onChange={update}>
		  <AssigneeSelects assignee_id={props.form.assignee_id} users={props.users}/>
		</Input>
	      </FormGroup>
	    </td>
	  </tr>
	  <tr>
	    <td>Completed</td>
	    <td>{t.completed ? "Yes" : "No"}</td>
	    <td></td>
	  </tr>
	  <tr>
	    <td>Time spent</td>
	    <td>{t.act_time}</td>
	    <td></td>
	  </tr>
	  <tr>
	    <td>Description</td>
	    <td>{t.desc}</td>
	    <td></td>
	  </tr>
	</tbody>
      </table>
    </Form>;
  } else {
    return "Loading...";
  }
});


function Fulltask(props) {
  //console.log("ft", props);
  return (
    <Taskform task={props.task} users={props.users}/>
  );
}

function statetoprops(props) {
  //console.log("s2", props);
  return {
    assignee_id: props.assignee_id,
    completed: props.completed,
    act_time: props.act_time,
  };
}

export default connect(statetoprops)(Fulltask);
