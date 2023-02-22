import React from "react";

const DJComponent = () => {
  return (
    <div>
      {/* <section className="Hero my-28 px-20"> */}
      <div className="container flex justify-center my-6 gap-5 mx-auto">
        <button
          className="button outline outline-2 rounded-lg px-5 py-3 font-semibold font-inter hidden md:block"
          role="button"
          // onClick={handleSignup}
        >
          Sign up
        </button>
        <button
          className="button outline outline-2 rounded-lg px-5 py-3 font-semibold font-inter hidden md:block"
          role="button"
          // onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default DJComponent
  



      
  


