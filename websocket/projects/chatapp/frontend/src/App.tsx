import "./styles/index.css";
function App() {
  return (
    <>
      <section className="messenger_wrapper max-w-[520px] mx-auto text-white">
        <h1 className="title text-center text-red-500 font-bold text-2xl mt-4">Chat App</h1>
        <hr />

        <div className="message_container border-2 mt-4 h-[640px] relative">
          <div className="messages">
            <ul>
              <li className="bg-blue-700 w-auto">Hi</li>
            </ul>
          </div>
          <form action="" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full p-4 bg-slate">
            <input type="text" placeholder="Message" name="message" className="bg-transparent border-2 w-[80%] p-2" />
            <button className="border-2 border-blue-500 p-2 w-[20%]">send</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
