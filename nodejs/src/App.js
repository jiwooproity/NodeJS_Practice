import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const App = () => {
  const [data, setData] = useState([]);

  const socket = io("/");

  useEffect(() => {
    const data = async () => {
      const list = await axios.get("/test");
      setData(list.data);
    };

    data();
    socket.on("message", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <img src={item.skinFile} key={index} />
      ))}
      <button onClick={() => socket.emit("message", { data: "asdsadsad" })}>sadasd</button>
    </div>
  );
};

export default App;
