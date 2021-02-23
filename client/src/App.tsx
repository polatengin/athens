import React, { useState } from 'react';

import { useWebHook } from "./useWebHook";

export const App = () => {

  const socket = useWebHook();

  const [ message, setMessage ] = useState("");

  return (
    <div className="App">
      APP
      <hr />
      { message }
    </div>
  );
};
