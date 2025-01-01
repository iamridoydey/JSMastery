import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  function handleOnSubmit() {
    if (!socket) return;
    const message = inputRef?.current?.value;
    if (message) {
      socket.send(message);
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (ev) => {
      alert(ev.data);
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleOnSubmit}>Send</button>
    </div>
  );
}

export default App;
