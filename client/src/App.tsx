import React, { useEffect, useState } from 'react';

import { useWebHook } from "./useWebHook";

export const App = () => {

  const socket = useWebHook();

  const [ message, setMessage ] = useState("");

  useEffect(() => {

    console.log("socket_id", socket.id);

    socket.on("broadcast", (data: object) => {
      console.log("broadcast received from socket", data);
    });

  }, [ socket ]);

  return (
    <div className="App">
      APP
      <hr />
      <button onClick={() => {
        fetch("/api/websocket/broadcast", { method: "POST" }).then(response => response.json().then(json => console.log("json", json)));
      }}>Broadcast</button>
      <hr />
      { message }
    </div>
  );
};
