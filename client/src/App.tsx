import React, { useEffect, useState } from 'react';

import { useWebHook } from "./useWebHook";

export const App = () => {

  const socket = useWebHook();

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
