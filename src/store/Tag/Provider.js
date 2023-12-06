import { useState } from "react";
import Context from "./Context";

const Provider = ({ children }) => {
  const [tag, setTag] = useState();

  return (
    <Context.Provider value={{ tag, setTag }}>{children}</Context.Provider>
  );
};

export default Provider;
