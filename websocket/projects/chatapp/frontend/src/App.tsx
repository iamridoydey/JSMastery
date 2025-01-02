import { FormEvent, useEffect, useRef, useState } from "react";
import "./styles/index.css";

interface Message {
  order: string;
  val: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputRef || !inputRef.current) return;

    const value = inputRef?.current?.value.trim();
    if (value === "") return;

    setMessages((old) => [...old, { order: "right", val: value }]);
    inputRef.current.value = "";
    if (!socket) return;
    socket.send(value);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (message) => {
      setMessages((oldMessages) => [
        ...oldMessages,
        { order: "left", val: message.data },
      ]);
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <section className="messenger_wrapper max-w-[520px] mx-auto text-white">
        <h1 className="title text-center text-red-500 font-bold text-2xl mt-4">
          Chat App
        </h1>
        <hr />

        <div className="message_container border-2 mt-4 h-[640px] relative">
          <div className="messages border-2 overflow-y-scroll mb-8">
            <ul className="message_parent flex flex-col h-full">
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={`bg-blue-700 block w-fit px-6 py-2 m-2 rounded-full text-xl ${
                    message.order === "left"
                      ? "self-start bg-green-700"
                      : "self-end bg-blue-700"
                  }`}
                >
                  {message.val}
                </li>
              ))}
            </ul>
          </div>
          <form
            onSubmit={handleOnSubmit}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full p-4 bg-slate-800"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Message"
              name="message"
              className="bg-transparent border-2 w-[80%] p-2"
            />
            <button
              className="border-2 border-blue-500 p-2 w-[20%]"
              type="submit"
            >
              send
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
