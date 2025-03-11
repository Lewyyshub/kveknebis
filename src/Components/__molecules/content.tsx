import { useState } from "react";
import Header from "../__atoms/header";
import Search from "../__atoms/search";
import Flags from "../__molecules/flags";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Search darkMode={darkMode} />
      <Flags darkMode={darkMode} />
    </div>
  );
}

export default App;
