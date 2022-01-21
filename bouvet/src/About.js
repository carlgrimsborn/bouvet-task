import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <p>My info: </p>
      <div className="box">
        <p>Name: </p>
        <p>Carl Grimsborn</p>
      </div>
      <div className="box">
        <p>Tel: </p>
        <p>0763968062</p>
      </div>
      <div className="box">
        <p>Email: </p>
        <p>carlgrimsborn@gmail.com</p>
      </div>
      <button onClick={() => navigate("/")} className="button">
        Home
      </button>
    </div>
  );
};

export default About;
