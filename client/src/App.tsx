import React, { useEffect, useState } from 'react';

import { useWebSocketHook } from "./useWebSocketHook";

export const App = () => {

  const socket = useWebSocketHook();

  const [ message, setMessage ] = useState("");

  useEffect(() => {

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
