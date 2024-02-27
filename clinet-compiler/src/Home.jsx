import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Home() {
  
  const navigate=useNavigate()
  useEffect(()=>{
    const jwt=localStorage.getItem('jwt')
    if(jwt){
      navigate("/join")
     
    }
  },[])
 
  
  return (
    <div className="relative h-screen">

      <div className="absolute inset-0 z-0 bg-landing-background bg-cover filter blur-sm"></div>
      <div className="relative z-1 flex flex-col items-center justify-center h-full">
        <h1 className="p-8 text-7xl underline drop-shadow-md text-white">
          Welcome to Code With Friend{" "} A REPLIT Clone
        </h1>
        <h2 className="text-4xl m-10">Happy Coding <span>&#128512;</span> !</h2>
        <div className="w-1/2 bg-zinc-100 flex justify-center rounded-md shadow-2xl">
          <Link to="/signup">
            <button className="m-6 p-4 bg-blue-500 text-white rounded-md">
              Create Account
            </button>
          </Link>
          <Link to="/login">
            <button className="m-6 p-4 bg-green-500 text-white rounded-md">
              Already have an account!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
