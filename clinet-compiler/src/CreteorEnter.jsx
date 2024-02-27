import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Websocketcontext } from "./UserContext";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
function CreateorEnter() {
  const navigate = useNavigate();
  const { token } = useContext(Websocketcontext);
  const inputelement = useRef();

  return (
    <>
      <div className="flex flex-col justify-center h-screen items-center">
        <button
          className="m-6 p-4 rounded-md w-2/5 bg-green-500"
          onClick={() => {
            navigate(`/editor/${token}`);
          }}
        >
          Create Room{" "}
        </button>

        <input
          placeholder="Enter RoomID"
          type="text"
          ref={inputelement}
          className="m-6 p-4 rounded-md w-2/5 text-center"
        ></input>

        <Link className="m-6 p-4 rounded-md w-2/5 bg-green-500 text-center">
          <button
            className="text-center"
            onClick={() => {
              navigate(`/editor/${inputelement.current.value}`);
            }}
          >
            Join Room
          </button>
        </Link>

        <button
          className="m-6 p-4 rounded-md w-2/5 bg-green-500"
          onClick={() => {
            localStorage.removeItem("jwt");
            navigate(`/`);
          }}
        >
          Log Out{" "}
        </button>
      </div>
    </>
  );
}
export default CreateorEnter;
