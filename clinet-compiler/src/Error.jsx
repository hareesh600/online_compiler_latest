import { useRouteError } from "react-router-dom";

function Error() {

  const err=useRouteError()
  return (
    <div className=" h-screen flex  flex-col justify-center items-center">
      <h1 className="text-3xl"> ⚠️ Something went wrong </h1>
      {/* <h2>{err.status + ":" + err.statusText}</h2> */}
    </div>
  );
}
export default Error;
