import React from 'react';

export default function Flash(params) {
  console.log(params);
  if (params.flash.message.length > 0) {
    return <p className="alert alert-info" role="alert">
      {params.flash.message}
    </p>;
  } else {
    return "";
  }
}
