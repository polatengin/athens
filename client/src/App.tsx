import React, { useState } from 'react';

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
