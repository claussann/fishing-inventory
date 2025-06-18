import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoStarter from "./Pages/LogoStarter";

import "./App.css";

function App() {
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate();

  setTimeout(() => {
    setShowLogo(false);
    navigate("/Home");
  }, 5000);

  return (
    <>
    <LogoStarter />
    </>
  );
}

export default App;
