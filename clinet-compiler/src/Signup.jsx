import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from './assets/back.png';

function Signup() {
const[username,setusername]=useState("")
const[password,setpassword]=useState("")
const navigate=useNavigate()


async function submithandler(){

    let data={
        "email":username,
        "password":password,
    }
    data=JSON.stringify(data)
    const url="http://127.0.0.1:8000/signin"

    console.log(typeof(data))
    const response=await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body:data,
    })
 const res=await response.json()
 console.log(res)
    if(res.status==200){
        navigate("/login")
    }
    else{
        navigate("/error")
    }
}

  return (
    <>
   
   

   
      <div className=" flex flex-col items-center justify-center h-screen" >
        <div id="wrap" className="bg-zinc-100 rounded-xl p-8 shadow-md border-1">
        <h1 className=" text-center skew-y-2 skew-x-3 drop-shadow-md capitalize  m-8 text-5xl  tracking-wide line-through decoration-white"> Code With Friend</h1>
          <div className="m-8">
        
            <input
              type="text"
              id="username"
              value={username}
              className="rounded-2xl my-2 w-full h-8 text-center "
              onChange={(e)=>setusername(e.target.value)}
              
            />
            <br />
            <input
              type="password"
              id="pwd"
              value={password}
              className="rounded-2xl my-2 w-full h-8 text-center"
              onChange={(e)=>setpassword(e.target.value)}
             
            />
            <br />
            <button
              id="btn"
              onClick={submithandler}
              className=" rounded-2xl bg-cyan-400 px-10 my-2 w-full h-8"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
