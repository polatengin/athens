import React, { useEffect, useState } from 'react';

import { useWebHook } from "./useWebHook";

export const App = () => {

  const socket = useWebHook();

  console.log("socket_id", socket.id);

  const [ message, setMessage ] = useState("");

  useEffect(() => {
  }, []);

  return (
    <div className="App">
      APP
      <hr />
      { message }
    </div>
  );
};
