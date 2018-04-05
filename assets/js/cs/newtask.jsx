//based on code from ntuck
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import store from '../store';

let Newtaskform = connect(({ntform, token}) => {return {ntform, token};})((props) => {
  function update(ev) {
    let target = $(ev.target);
    let data = {};
    data[target.attr('name')] = target.val();
    props.dispatch({
      type: 'UPDATE_NEW_TASK_FORM',
      data: data
    });
  }
  
  function create_task(ev) {
    //console.log(props);
    //console.log(props.ntform);
    let t = {
      title: props.ntform.title,
      desc: props.ntform.desc,
      requester_id: props.token.user_id,
      act_time: 0,
      completed: false
    }
    api.submit_task(t);
  }

  if (props.token) {
    return (
      <div>
	<h1>Create new task</h1>
	<Form>
	  <FormGroup>
	    <Input type="text" name="title" placeholder="title"
		   value={props.ntform.title} onChange={update}/>
	  </FormGroup>
	  <FormGroup>
	    <Input type="text" name="desc" placeholder="description"
		 value={props.ntform.desc} onChange={update}/>
	  </FormGroup>
	  <Button onClick={create_task}>Create Task</Button>
	</Form>
      </div>
    );
  } else {
    return "Log in to create new tasks";
  }
});
							    
function Newtask(props) {
  //console.log("nt", props);
  return <Newtaskform/>;
}

function statetoprops(state) {
  //console.log("s2", state);
  return {
    title: state.title,
    desc: state.desc,
    user_id: state.user_id,
  }
}

export default connect(statetoprops)(Newtask);
			    
