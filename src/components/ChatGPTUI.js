import { getDogAns } from "../utilities/util";
import ChatIcon from "./ChatIcon";
import { useState } from "react";

function ChatGPTUI() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      role: "system",
      content: "I am a helpful assistant designed to output JSON.",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newQuestionlog = { role: "user", content: input };

    const nonStringifiedRequestBody = { message: [...chatLog, newQuestionlog] };
    const requestBody = JSON.stringify(nonStringifiedRequestBody);

    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const data = await response.json();
    const copyAfterRecResp = [...chatLog, newQuestionlog];

    const formedResponse = {
      role: "system",
      content: data.data,
    };
    copyAfterRecResp.push(formedResponse);
    setChatLog(copyAfterRecResp);
  };

  const handlChange = (e) => setInput(e.target.value);
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span>New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}
        </div>
      </section>
      <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={handlChange}
            rows={1}
            className="chat-input-textarea"
          ></input>
        </form>
      </div>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.role === "system" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.role === "system" && "chatgpt"}`}>
          {message.role === "system" ? <ChatIcon /> : "user"}
        </div>
        <div className="message">{getDogAns(message.content)}</div>
      </div>
    </div>
  );
};
export default ChatGPTUI;
