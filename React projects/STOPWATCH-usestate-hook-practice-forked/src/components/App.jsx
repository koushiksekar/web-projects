import React from "react";

function App() {
  let Time = new Date().toLocaleTimeString();
  const [time, setTime] = React.useState(Time);

  function timeout() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  setInterval(timeout, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={timeout}>Get Time</button>
    </div>
  );
}

export default App;
