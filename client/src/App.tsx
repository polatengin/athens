import React, { useEffect, useState } from 'react';

import { useWebHook } from "./useWebHook";

export const App = () => {

  const socket = useWebHook();

  console.log("socket_id", socket.id);

  // client -> server
  socket.on("broadcast", (data: object) => {
    console.log(data);
  });

  const [ message, setMessage ] = useState("");

  useEffect(() => {
  }, []);

  return (
    <div className="App">
      APP
      <hr />
      <button onClick={() => {
        fetch("/api/websocket/broadcast", { method: "POST" }).then(response => response.json().then(json => console.log(json)));
      }}>Broadcast</button>
      <hr />
      { message }
    </div>
  );
};
