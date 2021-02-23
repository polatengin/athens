import React, { useState } from 'react';

import { useWebHook } from "./useWebHook";

export const App = () => {

  const socket = useWebHook();

  const [ message, setMessage ] = useState("");

  fetch("http://localhost:4000/", {
    "method": "GET"
  }).then(response => {
    response.text().then(text => {
      setMessage(text);
    });
  });

  return (
    <div className="App">
      APP
      <hr />
      { message }
    </div>
  );
};
