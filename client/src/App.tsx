import React, { useState } from 'react';

import { useWebHook } from "./useWebHook";
export const App = () => {

  const [ message, setMessage ] = useState("");

  return (
    <div className="App">
      APP
      <hr />
      { message }
    </div>
  );
};
