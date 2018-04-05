//based on code from ntuck
//https://github.com/NatTuck/microblog-spa/tree/lec20-end

import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  return <p>
    <Link to={"/users/"+params.user.id}>ID#{params.user.id}: {params.user.username}</Link>
  </p>;
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu}/>);
  return <div>
    {users}
  </div>;
}
