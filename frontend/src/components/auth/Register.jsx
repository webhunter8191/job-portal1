import React from "react";
import Navbar from "./../shared/Navbar";
import Home from "./../Home";

const Register = () => {
  return (
    <div>
      <Navbar />
      <div>
        <form action="">
          <h1>Register</h1>
          <div>
            <Label>Full Name</Label>
            <input type="text" placeholder="Enter your full name" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
