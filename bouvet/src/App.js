import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./About";
import "./App.css";
import Home from "./Home";

function App() {
  const [reload, setReload] = useState();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([
    {
      image: "",
      title: "",
    },
  ]);

  const loadTimeout = () =>
    setTimeout(() => {
      setReload(!reload);
    }, 30000);

  const asyncTask = async () => {
    fetchData();
  };

  useEffect(() => {
    loadTimeout();
    asyncTask();
  }, [reload]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/");
      console.log("resp: ", res);
      if (res.data) {
        setData(convertStringToData(res.data.data));
        setLoading(false);
      } else if (res.errors) {
        throw new Error("responded with errors: ", res.errors);
      }
    } catch (e) {
      alert(e.toString());
    }
    console.log(data, "data1");
  };

  const convertStringToData = (dataString) => {
    let data = "";
    let indexes = [];
    let objectArray = [];
    data = dataString;
    data = data.slice(data.indexOf("<URL kommentar>") + 15, -1);
    data = data.replace(
      data.slice(data.indexOf("Warning:") + 8, data.indexOf("https")),
      ""
    );
    for (let i = 0; i < data.length; i++) {
      if (data[i].match("^\\s+$")) {
        indexes.push(i);
        console.log(indexes, "indexes");
      }
    }
    console.log(data, "cutted");
    indexes.map((index, i) => {
      let itemsDone = [];
      if ((i + 1) % 2 === 0) {
        if (i === 0) {
          return;
        }
        if (
          itemsDone.map((item) => {
            if (i === item) {
              return true;
            }
            return false;
          }).length >= 1
        ) {
          return;
        }
        itemsDone.push(i);
        console.log("does", i);
        let title2 = false;

        if (data.charAt(indexes[i + 1] + 1) !== "h") {
          if (data.charAt(indexes[i + 1] + 1) === "^\\s+$") {
            return;
          }
          console.log(data.charAt(indexes[i + 1] + 1), "charAt");
          title2 = data.slice(indexes[i + 1], indexes[i + 2]);
          itemsDone.push(i + 2);
        }
        const image =
          i >= 4
            ? data.slice(index, indexes[i + 1])
            : data.slice(indexes[i - 1] + 1, index);
        const obj = {
          image: image,
          title: `${data.slice(indexes[i] + 1, indexes[i + 1])}${
            indexes.pop() === indexes[i] ? "" : title2 ? " " + title2 : ""
          }`,
        };
        objectArray.push(obj);
      } else {
        return;
      }
    });
    return objectArray;
  };
  const onPressReload = () => {
    setReload(!reload);
  };

  return (
    <Router>
      <div className="Header">
        <h1>Welcome</h1>
      </div>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home data={data} loading={loading} onPressReload={onPressReload} />
          }
        ></Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
