"use client";

import { useEffect, useState } from "react";

import { useWebSocketHook } from "../useWebSocketHook";

export default function Home() {

  const socket = useWebSocketHook();

  const [ message ] = useState("");

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
}
