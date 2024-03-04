import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import { Websocketcontext } from "./UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Navbar from './Navbar';
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const EditorWrapper = styled.div`
  flex: 1;
  padding: 20px;
  width: 75%;
`;

const Output = styled.div`
  width: 25%;
  background: white;
  padding-right:8px;
  display: flex;
  flex-direction: column;
`;

const Tools = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  // margin-top: auto;
`;

export default function App() {
  const [editorValue, setEditorValue] = useState(`print("Hello world")`);
  const [output, setOutput] = useState(["Hello world"]);
  const { token } = useContext(Websocketcontext);
  const [socket, setSocket] = useState(null);
  const [executed, setExecuted] = useState(false);
  const navigate = useNavigate();
  const [chat, setchat] = useState(false);
  const [message, setMessage] = useState("");
  const [stream, setStream] = useState([])

  // websocket connection

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/${token}`);
    setSocket(newSocket);
    setExecuted(true);
  }, []);

  console.log("hello");

  //sending updated code through websocket
  function handleEditorChange(value) {
    setEditorValue(value);
    const code = {
      code: value,
    };
    socket.send(JSON.stringify(code));
  }

  //sending chat messages
  function sendMessage() {
    console.log(localStorage.getItem("jwt"))
    let data = {
      "Message": message,
      "jwt": localStorage.getItem("jwt")
    }
    socket.send(JSON.stringify(data));
    setMessage("")

  }

  if (executed && socket) {
    socket.onmessage = (event) => {
      const obj = JSON.parse(event.data);
      const codeString = obj.code;
      if (codeString) {
        const formattedCode = codeString.replace(/\\n/g, "\n");
        console.log(formattedCode);
        setEditorValue(formattedCode);
      }
      else if (obj.Message) {
        setStream((prev) => [...prev, obj])
      }
    };
  }

  function getCompiledCode() {
    const userInput = document.getElementById("userInput").value;
    console.log(userInput)
    let lines = editorValue.split("\n");
    let codeString = lines.join("\n");
    const data = {
      inputdata: userInput,
      language: "python",
      code: codeString,
    };
    console.log(data)



    async function fetchData(url, data) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",

          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData.output);
        let liness = responseData.output.split("\n");

        console.log(liness);
        setOutput(liness);
      } catch (error) {
        console.error("Error:", error.message);
        navigate("/error");
      }
    }

    const url = "http://127.0.0.1:8000/api/code";
    fetchData(url, data);
  }

  return localStorage.getItem("jwt") ? (

    <Wrapper>
      <EditorWrapper >
        <select>
          <option>Python3</option>
        </select>
        <div class="border-4 border-green-900 border-solid
                    bg-green-400 w-full h-full">
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="python"
            value={editorValue}
            onChange={handleEditorChange}
            placeholder=""
          />
        </div>
      </EditorWrapper>


      <Output className="h-screen ">
        <div id="wrap-input-output" className="flex flex-col h-4/5 relative " >
          {chat && (<div className=" h-4/5 mt-1 fixed z-10">
            <div
              id="chat"
              className="h-4/5  overflow-y-scroll  bg-green-300 rounded-lg "
            >

              {stream.map((data, index) => (
                <div key={index} className="bg-white p-1 m-1 rounded-md  w-fit"><p className=" font-thin text-xs italic p-0 m-0">{data.from}</p ><p className="text-sm px-1 break-all">{data.Message}</p></div>
              ))}

            </div>
            <div className="flex justify-between  m-1 ">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-3/4 border-red-800 bg-gray-400 rounded-lg"
              ></input>
              <button
                onClick={sendMessage}
                className="bg-emerald-400 py-1 px-2 rounded-md"
              >
                Send
              </button>
            </div>
          </div>
          )}
          {!chat && (
            <div id="input" className="h-2/5 overflow-auto relative bg-black rounded-lg mt-10">
              <p className="bg-zinc-400 text-center sticky top-0 left-0 ">Input</p>
              <textarea
                id="userInput"
                class="w-full h-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:border-blue-500"
                placeholder="single input 2 ,  arr input like this 2 3 4 5"
              ></textarea>
            </div>
          )}
          <div
            id="output"
            className="h-2/5 overflow-auto relative bg-black rounded-lg mt-10"
          >
            <p className="bg-zinc-400 text-center sticky top-0 left-0">
              Output
            </p>
            <p className="text-white">
              {output.map((x, index) => (
                <p key={index}>{x}</p>
              ))}
            </p>
          </div>
        </div>

        <Tools className="h-fit">
          {chat ?
            <button
              onClick={() => setchat(!chat)}
              className="bg-green-400 py-2 px-5 rounded-md "
            >
              Input
            </button> : <button
              onClick={() => setchat(!chat)} chat
              className="bg-green-400 py-2 px-5 rounded-md "
            >
              CHAT
            </button>}

          <button onClick={() => {
            let url = window.location.href
            let arr = url.split('/')
            let shareid = arr[arr.length - 1]
            const baseUrl = "https://wa.me/";
            const messageParams = encodeURIComponent(`Hey join this link and help me with this\n
            Link:http://localhost:5000/editor/2b9f6f53-b934-45f1-ab54-3780e47ee52c\n
            RoomID:${shareid}`);
            const wurl = `${baseUrl}?text=${messageParams}`;
            window.open(wurl, "_blank");
            console.log(shareid)

          }}
            className="bg-green-400 py-2 px-5 rounded-md ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
          </button>

          <button
            onClick={getCompiledCode}
            className="bg-green-400 py-2 px-5 rounded-md "
          >
            RUN
          </button>
          <button
            onClick={() => setOutput([])}
            className="bg-green-400 py-2 px-4 rounded-md"
          >
            CLEAR
          </button>
        </Tools>
      </Output>
    </Wrapper>
  ) : (
    navigate("/")
  );
}





