// App.js
import "./App.css";

import { useState } from "react";
import { LoginContext } from "./contexts/LoginContext";
import Content from "./components/Content";
import { ItemContext } from "./contexts/ItemContext";

import logoImage from "./images/logo2.png"; // 로고 이미지를 import

function App() {
  const BTOKEN = sessionStorage.getItem("BTOKEN");
  const ROLE = sessionStorage.getItem("ROLE");
  const LOGINER = sessionStorage.getItem("LOGINER");

  const [loginInfo, setLoginInfo] = useState({ BTOKEN, LOGINER, ROLE });

  const ITEM_ID = sessionStorage.getItem("ITEM_ID");

  const [itemInfo, setItemInfo] = useState(ITEM_ID);

  return (
    <div className="App">
      <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
        <ItemContext.Provider value={{ itemInfo, setItemInfo }}>
          <Content />
        </ItemContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
