import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Home = ({ data, loading, onPressReload }) => {
  const navigate = useNavigate();
  console.log(data, "data2");
  return (
    <div className="App">
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          {data.map((item) => {
            return (
              <>
                <p>{item.title}</p>
                <img className="img-size" src={item.image}></img>
              </>
            );
          })}
          <button onClick={onPressReload} className="button">
            Reload
          </button>
          <button onClick={() => navigate("About")} className="button">
            About
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
