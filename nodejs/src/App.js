import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = async () => {
      const list = await axios.get("/test");
      setData(list.data);
    };

    data();
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <img src={item.skinFile} key={index} />
      ))}
    </div>
  );
};

export default App;
