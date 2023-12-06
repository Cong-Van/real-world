import { useState } from "react";
import Context from "./Context";

function Provider({ children }) {
  const [articlesCount, setArticlesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 10;

  return (
    <Context.Provider
      value={{
        articlesCount,
        setArticlesCount,
        isLoading,
        setIsLoading,
        limit,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
